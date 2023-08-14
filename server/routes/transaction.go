package routes

import (
	"landtick-be/handlers"
	"landtick-be/pkg/middleware"
	"landtick-be/pkg/mysql"
	"landtick-be/repository"

	"github.com/labstack/echo/v4"
)

func TransactionRoutes(e *echo.Group) {
	transactionRepository := repository.MakeRepository(mysql.DB)
	userRepository := repository.MakeRepository(mysql.DB)
	h := handlers.HandlerTransaction(transactionRepository, userRepository)

	e.GET("/transactions", h.FindTransactions)
	e.GET("/transaction/:id", h.GetTransaction)
	e.POST("/transaction", middleware.Auth(h.CreateTransaction))
	e.DELETE("/transaction/:id", h.DeleteTransaction)
	e.GET("/getpayment/:id", h.GetPayment)
	e.POST("/notification", h.Notification)
}
