package routes

import (
	"landtick-be/handlers"
	"landtick-be/pkg/middleware"
	"landtick-be/pkg/mysql"
	"landtick-be/repository"

	"github.com/labstack/echo/v4"
)

func AuthRoutes(e *echo.Group) {
	authRepository := repository.MakeRepository(mysql.DB)
	h := handlers.HandlerAuth(authRepository)

	e.POST("/register", h.Register)
	e.POST("/login", h.Login)
	e.GET("/check-auth", middleware.Auth(h.CheckAuth))
}
