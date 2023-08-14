package ticketsdto

type CreateTicketRequest struct {
	NameTrain            string `json:"name_train" form:"name_train" validation:"required"`
	TypeTrain            string `json:"type" form:"type" validation:"required"`
	StartDate            string `json:"start_date" form:"start_date" validation:"required"`
	StartStationID       int    `json:"start_station_id" form:"start_station_id" validation:"required"`
	StartTime            string `json:"start_time" form:"start_time" validation:"required"`
	DestinationStationID int    `json:"destination_station_id" form:"destination_station_id" validation:"required"`
	ArivalTime           string `json:"arival_time" form:"arival_time" validation:"required"`
	Price                int    `json:"price" form:"price" validation:"required"`
	Quantity             int    `json:"quantity" form:"quantity" validation:"required"`
}
