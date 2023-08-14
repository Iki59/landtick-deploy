package handlers

import (
	"fmt"
	dto "landtick-be/dto/result"
	transactionsdto "landtick-be/dto/transactions"
	"landtick-be/models"
	"landtick-be/repository"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/snap"
	"gopkg.in/gomail.v2"
)

// var path_file = "http://localhost:5000/uploads/"

type handlertransaction struct {
	TransactionRepository repository.TransactionRepository
	UserRepository        repository.UserRepository
}

func HandlerTransaction(TransactionRepository repository.TransactionRepository, UserRepository repository.UserRepository) *handlertransaction {
	return &handlertransaction{
		TransactionRepository: TransactionRepository,
		UserRepository:        UserRepository,
	}
}

func (h *handlertransaction) FindTransactions(c echo.Context) error {
	transactions, err := h.TransactionRepository.FindTransactions()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	// for i, p := range transactions {
	// 	transactions[i].Image = path_file + p.Image
	// }

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: "Success", Data: transactions})
}

func (h *handlertransaction) GetTransaction(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	transaction, err := h.TransactionRepository.GetTransaction(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: "Failed", Message: err.Error()})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Status: "Success", Data: transaction})
}

func (h *handlertransaction) CreateTransaction(c echo.Context) error {
	userLogin := c.Get("userLogin")
	userId := int(userLogin.(jwt.MapClaims)["id"].(float64))
	request := new(transactionsdto.CreateTransactionRequest)

	TicketID, _ := strconv.Atoi(c.FormValue("ticket_id"))
	// Image := c.Get("dataFile").(string)
	request.TicketID = TicketID
	// request.Image = Image

	validation := validator.New()
	err := validation.Struct(request)

	var transactionIsMatch = false
	var transactionId int
	for !transactionIsMatch {
		transactionId = int(time.Now().Unix())
		transactionData, _ := h.TransactionRepository.GetTransaction(transactionId)
		if transactionData.ID == 0 {
			transactionIsMatch = true
		}
	}

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Status:  "Failed",
			Message: err.Error()})
	}

	data := models.Transaction{
		ID:       transactionId,
		UserID:   userId,
		TicketID: request.TicketID,
		Status:   "Pending",
		// Image:    request.Image,
	}

	response, err := h.TransactionRepository.CreateTransaction(data)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Status: "Success",
		Data:   transactionResponse(response)})
}

func (h *handlertransaction) DeleteTransaction(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	transaction, err := h.TransactionRepository.GetTransaction(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.TransactionRepository.DeleteTransaction(transaction, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: "Success", Data: data})

}

func (h *handlertransaction) GetPayment(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	transaction, err := h.TransactionRepository.GetTransaction(id)
	fmt.Println(transaction)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}

	var s = snap.Client{}
	s.New(os.Getenv("SERVER_KEY"), midtrans.Sandbox)

	req := &snap.Request{
		TransactionDetails: midtrans.TransactionDetails{
			OrderID:  strconv.Itoa(transaction.ID),
			GrossAmt: int64(transaction.Ticket.Price),
		},
		CreditCard: &snap.CreditCardDetails{
			Secure: true,
		},
		CustomerDetail: &midtrans.CustomerDetails{
			FName: transaction.User.FullName,
			Email: transaction.User.Email,
		},
	}

	snapResp, _ := s.CreateTransaction(req)

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Status: "Success",
		Data:   snapResp,
	})
}

func (h *handlertransaction) Notification(c echo.Context) error {
	var notificationPayload map[string]interface{}

	if err := c.Bind(&notificationPayload); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	transactionStatus := notificationPayload["transaction_status"].(string)
	fraudStatus := notificationPayload["fraud_status"].(string)
	orderId := notificationPayload["order_id"].(string)

	order_Id, _ := strconv.Atoi(orderId)

	fmt.Println("ini payload maszehh", notificationPayload)

	transaction, _ := h.TransactionRepository.GetTransaction(order_Id)
	user, _ := h.UserRepository.GetUser(order_Id)
	if transactionStatus == "capture" {
		if fraudStatus == "challenge" {
			h.TransactionRepository.UpdateTransaction("pending", order_Id)
		} else if fraudStatus == "accept" {

			SendMail("success", transaction, user)
			h.TransactionRepository.UpdateTransaction("success", order_Id)
		}
	} else if transactionStatus == "settlement" {

		SendMail("success", transaction, user)
		h.TransactionRepository.UpdateTransaction("success", order_Id)
	} else if transactionStatus == "deny" {
		h.TransactionRepository.UpdateTransaction("failed", order_Id)
	} else if transactionStatus == "cancel" || transactionStatus == "expire" {
		h.TransactionRepository.UpdateTransaction("failed", order_Id)
	} else if transactionStatus == "pending" {
		h.TransactionRepository.UpdateTransaction("pending", order_Id)
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: "Success", Data: notificationPayload})

}

func SendMail(status string, transaction models.Transaction, user models.User) {
	if status != transaction.Status && (status == "success") {

		var CONFIG_SMTP_HOST = "smtp.gmail.com"
		var CONFIG_SMTP_PORT = 587
		var CONFIG_SENDER_NAME = "LandTick <demo.landtick@gmail.com>"
		var CONFIG_AUTH_EMAIL = os.Getenv("EMAIL_SYSTEM")
		var CONFIG_AUTH_PASSWORD = os.Getenv("PASSWORD_SYSTEM")

		var ticket = strconv.Itoa(transaction.ID)
		var price = strconv.Itoa(transaction.Ticket.Price)

		mailer := gomail.NewMessage()
		mailer.SetHeader("From", CONFIG_SENDER_NAME)
		mailer.SetHeader("To", transaction.User.Email)
		mailer.SetHeader("Subject", "Transaction Status")
		mailer.SetBody("text/html", fmt.Sprintf(`<!DOCTYPE html>
    <html lang="en">
      <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style>
        h1 {
        color: brown;
        }
      </style>
      </head>
      <body>
      <h2>Product payment :</h2>
      <ul style="list-style-type:none;">
        <li>Name : %s</li>
        <li>Total payment: Rp.%s</li>
        <li>Status : <b>%s</b></li>
      </ul>
      </body>
    </html>`, ticket, price, status))

		dialer := gomail.NewDialer(
			CONFIG_SMTP_HOST,
			CONFIG_SMTP_PORT,
			CONFIG_AUTH_EMAIL,
			CONFIG_AUTH_PASSWORD,
		)

		err := dialer.DialAndSend(mailer)
		if err != nil {
			log.Fatal(err.Error())
		}

		log.Println("Mail sent! to " + transaction.User.Email)
	}
}

func transactionResponse(u models.Transaction) transactionsdto.TransactionResponse {
	return transactionsdto.TransactionResponse{
		ID:       u.ID,
		UserID:   u.UserID,
		TicketID: u.TicketID,
	}
}
