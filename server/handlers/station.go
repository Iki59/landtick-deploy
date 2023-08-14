package handlers

import (
	dto "landtick-be/dto/result"
	stationsdto "landtick-be/dto/stations"
	"landtick-be/models"
	"landtick-be/repository"
	"net/http"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

type handlerstation struct {
	StationRepository repository.StationRepository
}

func HandlerStation(StationRepository repository.StationRepository) *handlerstation {
	return &handlerstation{StationRepository}
}

func (h *handlerstation) FindStations(c echo.Context) error {
	tickets, err := h.StationRepository.FindStations()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Status: "Success", Data: tickets})
}

func (h *handlerstation) GetStation(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	station, err := h.StationRepository.GetStation(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: "Failed", Message: err.Error()})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Status: "Success", Data: stationResponse(station)})
}

func (h *handlerstation) CreateStation(c echo.Context) error {
	request := new(stationsdto.CreateStationRequest)
	if err := c.Bind(&request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Status:  "Failed",
			Message: err.Error()})
	}

	validation := validator.New()
	err := validation.Struct(request)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Status:  "Failed",
			Message: err.Error()})
	}

	data := models.Station{
		Name: request.Name,
	}

	response, err := h.StationRepository.CreateStation(data)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Status: "Success",
		Data:   response})
}

func (h *handlerstation) UpdateStation(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	station, err := h.StationRepository.GetStation(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Status:  "Failed",
			Message: err.Error()})
	}

	request := new(stationsdto.UpdateStationRequest)
	if err := c.Bind(&request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Status:  "Failed",
			Message: err.Error()})
	}

	if request.Name != "" {
		station.Name = request.Name
	}

	// user.UpdatedAt = time.Now()

	response, err := h.StationRepository.UpdateStation(station)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Status: "Success",
		Data:   response})
}

func (h *handlerstation) DeleteStation(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	station, err := h.StationRepository.GetStation(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Status:  "Failed",
			Message: err.Error()})
	}

	data, err := h.StationRepository.DeleteStation(station)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Status: "Success",
		Data:   stationResponse(data)})
}

func stationResponse(u models.Station) stationsdto.StationResponse {
	return stationsdto.StationResponse{
		ID:   u.ID,
		Name: u.Name,
	}
}
