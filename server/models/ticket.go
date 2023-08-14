package models

type Ticket struct {
	ID                   int     `json:"id" gorm:"primary_key:auto_increment"`
	NameTrain            string  `json:"name_train" gorm:"type: varchar(255)"`
	TypeTrain            string  `json:"type" gorm:"type: varchar(255)"`
	StartDate            string  `json:"start_date"`
	StartStation         Station `json:"start_station"`
	StartStationID       int     `json:"start_station_id"`
	StartTime            string  `json:"start_time"`
	DestinationStation   Station `json:"destination_station"`
	DestinationStationID int     `json:"destination_station_id"`
	ArivalTime           string  `json:"arival_time"`
	Price                int     `json:"price"`
	Quantity             int     `json:"quantity"`
}

type TicketResponse struct {
	ID                   int     `json:"id"`
	NameTrain            string  `json:"name_train"`
	TypeTrain            string  `json:"type"`
	StartDate            string  `json:"start_date"`
	StartStation         Station `json:"start_station"`
	StartStationID       int     `json:"start_station_id"`
	StartTime            string  `json:"start_time"`
	DestinationStation   Station `json:"destination_station"`
	DestinationStationID int     `json:"destination_station_id"`
	ArivalTime           string  `json:"arival_time"`
	Price                int     `json:"price"`
}

func (TicketResponse) TableName() string {
	return "tickets"
}
