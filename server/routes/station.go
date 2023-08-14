package routes

import (
	"landtick-be/handlers"
	"landtick-be/pkg/mysql"
	"landtick-be/repository"

	"github.com/labstack/echo/v4"
)

func StationRoutes(e *echo.Group) {
	stationRepository := repository.MakeRepository(mysql.DB)
	h := handlers.HandlerStation(stationRepository)

	e.GET("/stations", h.FindStations)
	e.GET("/station/:id", h.GetStation)
	e.POST("/station", h.CreateStation)
	e.PATCH("/station/:id", h.UpdateStation)
	e.DELETE("/station/:id", h.DeleteStation)
}
