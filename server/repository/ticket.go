package repository

import (
	"landtick-be/models"
)

type TicketRepository interface {
	FindTickets() ([]models.Ticket, error)
	FilterTicket(StartStationID, DestionationStationID int) ([]models.Ticket, error)
	GetTicket(ID int) (models.Ticket, error)
	CreateTicket(ticket models.Ticket) (models.Ticket, error)
	GetMyTicket(UserID int) ([]models.Transaction, error)
	// UpdateTicket(ticket models.Ticket) (models.Ticket, error)
	// DeleteTicket(ticket models.Ticket) (models.Ticket, error)
}

func (r *repository) FindTickets() ([]models.Ticket, error) {
	var tickets []models.Ticket
	// err := r.db.Raw("SELECT * FROM users").Scan(&users).Error
	err := r.db.Preload("StartStation").Preload("DestinationStation").Find(&tickets).Error

	return tickets, err
}

func (r *repository) FilterTicket(StartStationID, DestinationStationID int) ([]models.Ticket, error) {
	var tickets []models.Ticket
	err := r.db.Where("start_station_id = ? AND destination_station_id=?", StartStationID, DestinationStationID).Preload("StartStation").Preload("DestinationStation").Find(&tickets).Error

	return tickets, err
}

func (r *repository) GetTicket(ID int) (models.Ticket, error) {
	var ticket models.Ticket
	// err := r.db.Raw("SELECT * FROM users WHERE id = ?", ID).Scan(&user).Error
	err := r.db.Preload("StartStation").Preload("DestinationStation").First(&ticket, ID).Error

	return ticket, err
}

func (r *repository) CreateTicket(ticket models.Ticket) (models.Ticket, error) {
	// err := r.db.Exec("INSERT INTO users(name, email, password) VALUES(?,?,?)", user.Name, user.Email, user.Password).Error
	err := r.db.Create(&ticket).Error
	return ticket, err
}

func (r *repository) GetMyTicket(UserID int) ([]models.Transaction, error) {
	var myticket []models.Transaction

	err := r.db.Where("user_id = ?", UserID).Preload("User").Preload("Ticket").Preload("Ticket.StartStation").Preload("Ticket.DestinationStation").Find(&myticket).Error
	return myticket, err
}

// func (r *repository) UpdateTicket(ticket models.Ticket) (models.Ticket, error) {
// 	// err := r.db.Raw("UPDATE users SET name=?, email=?, password=?, updated_at=? WHERE id = ?", user.Name, user.Email, user.Password, user.UpdatedAt, ID).Scan(&user).Error
// 	err := r.db.Save(&ticket).Error
// 	return ticket, err
// }

// func (r *repository) DeleteTicket(ticket models.Ticket) (models.Ticket, error) {
// 	// err := r.db.Raw("DELETE FROM users WHERE id=?", ID).Scan(&user).Error
// 	err := r.db.Delete(&ticket).Error
// 	return ticket, err
// }
