package routes

import (
	"landtick-be/handlers"
	"landtick-be/pkg/middleware"
	"landtick-be/pkg/mysql"
	"landtick-be/repository"

	"github.com/labstack/echo/v4"
)

func TicketRoutes(e *echo.Group) {
	ticketRepository := repository.MakeRepository(mysql.DB)
	h := handlers.HandlerTicket(ticketRepository)

	e.GET("/tickets", h.FindTickets)
	e.GET("/ticket", h.FilterTicket)
	e.GET("/ticket/:id", h.GetTicket)
	e.POST("/ticket", h.CreateTicket)
	e.GET("/ticket-myticket", middleware.Auth(h.GetMyTicket))
}
