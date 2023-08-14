package handlers

import (
	"fmt"
	dto "landtick-be/dto/result"
	ticketsdto "landtick-be/dto/tickets"
	"landtick-be/models"
	"landtick-be/repository"
	"net/http"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

type handlerticket struct {
	TicketRepository repository.TicketRepository
}

func HandlerTicket(TicketRepository repository.TicketRepository) *handlerticket {
	return &handlerticket{TicketRepository}
}

func (h *handlerticket) FindTickets(c echo.Context) error {
	tickets, err := h.TicketRepository.FindTickets()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: "Failed", Message: err.Error()})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Status: "Success", Data: tickets})
}

func (h *handlerticket) FilterTicket(c echo.Context) error {
	// startDate := c.QueryParam("start_date")
	startStationIDParam := c.QueryParam("start_station_id")
	destinationStationIDParam := c.QueryParam("destination_station_id")

	// fmt.Println(startDate)

	var startStationID int
	if startStationIDParam != "" {
		var err error
		startStationID, err = strconv.Atoi(startStationIDParam)
		if err != nil {
			return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: "Failed", Message: "Invalid start_station_id"})
		}
	}

	fmt.Println(startStationID)

	var destinationStationID int
	if destinationStationIDParam != "" {
		var err error
		destinationStationID, err = strconv.Atoi(destinationStationIDParam)
		if err != nil {
			return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: "Failed", Message: "Invalid destination_station_id"})
		}
	}

	fmt.Println(destinationStationID)

	ticket, err := h.TicketRepository.FilterTicket(startStationID, destinationStationID)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: "Success", Data: ticket})
}

func (h *handlerticket) GetTicket(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	ticket, err := h.TicketRepository.GetTicket(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: "Failed", Message: err.Error()})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Status: "Success", Data: ticketResponse(ticket)})
}

func (h *handlerticket) CreateTicket(c echo.Context) error {
	StartStationID, _ := strconv.Atoi(c.FormValue("start_station_id"))
	DestinationStationID, _ := strconv.Atoi(c.FormValue("destination_station_id"))
	Price, _ := strconv.Atoi(c.FormValue("price"))
	Quantity, _ := strconv.Atoi(c.FormValue("quantity"))

	request := models.Ticket{
		NameTrain:            c.FormValue("name_train"),
		TypeTrain:            c.FormValue("type"),
		StartDate:            c.FormValue("start_date"),
		StartStationID:       StartStationID,
		StartTime:            c.FormValue("start_time"),
		DestinationStationID: DestinationStationID,
		ArivalTime:           c.FormValue("arival_time"),
		Price:                Price,
		Quantity:             Quantity,
	}
	validation := validator.New()
	err := validation.Struct(request)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Status:  "Failed",
			Message: err.Error()})
	}

	response, err := h.TicketRepository.CreateTicket(request)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Status: "Success",
		Data:   response,
	})
}

func (h *handlerticket) GetMyTicket(c echo.Context) error {
	claims := c.Get("userLogin")
	id := claims.(jwt.MapClaims)["id"].(float64)
	userID := int(id)

	ticket, err := h.TicketRepository.GetMyTicket(userID)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: "Failed", Message: err.Error()})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Status: "Success", Data: ticket})
}

func ticketResponse(u models.Ticket) ticketsdto.TicketResponse {
	return ticketsdto.TicketResponse{
		NameTrain:            u.NameTrain,
		TypeTrain:            u.TypeTrain,
		StartDate:            u.StartDate,
		StartStationID:       u.StartStationID,
		StartTime:            u.StartTime,
		DestinationStationID: u.DestinationStationID,
		ArivalTime:           u.ArivalTime,
		Price:                u.Price,
		Quantity:             u.Quantity,
	}
}
