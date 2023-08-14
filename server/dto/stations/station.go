package stationsdto

type CreateStationRequest struct {
	Name string `json:"name" form:"name" validation:"required"`
}

type UpdateStationRequest struct {
	Name string `json:"name" form:"name"`
}

type StationResponse struct {
	ID   int    `json:"id"`
	Name string `json:"name" form:"name" validate:"required"`
}
