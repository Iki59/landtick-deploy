package ticketsdto

type TicketResponse struct {
	NameTrain            string `json:"name_train"`
	TypeTrain            string `json:"type"`
	StartDate            string `json:"start_date"`
	StartStationID       int    `json:"start_station_id"`
	StartTime            string `json:"start_time"`
	DestinationStationID int    `json:"destination_station_id"`
	ArivalTime           string `json:"arival_time"`
	Price                int    `json:"price"`
	Quantity             int    `json:"quantity"`
	// UserID               int    `json:"user_id"`
}
type TicketMyResponse struct {
	NameTrain            string `json:"name_train"`
	TypeTrain            string `json:"type"`
	StartDate            string `json:"start_date"`
	StartStationID       int    `json:"start_station_id"`
	StartTime            string `json:"start_time"`
	DestinationStationID int    `json:"destination_station_id"`
	ArivalTime           string `json:"arival_time"`
	Price                int    `json:"price"`
	Quantity             int    `json:"quantity"`
	// UserID               int    `json:"user_id"`
}
