package models

type Transaction struct {
	ID       int                     `json:"id" gorm:"primary_key:auto_increment"`
	UserID   int                     `json:"-"`
	User     UserResponseTransaction `json:"user" gorm:"foreignKey:UserID"`
	TicketID int                     `json:"-"`
	Ticket   TicketResponse          `json:"ticket" gorm:"foreignKey:TicketID"`
	Status   string                  `json:"status" gorm:"type: varchar(255)"`
	// Image    string                  `json:"image"`
}
