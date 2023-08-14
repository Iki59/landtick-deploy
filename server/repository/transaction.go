package repository

import (
	"fmt"
	"landtick-be/models"
)

type TransactionRepository interface {
	FindTransactions() ([]models.Transaction, error)
	GetTransaction(transactionId int) (models.Transaction, error)
	CreateTransaction(ticket models.Transaction) (models.Transaction, error)
	UpdateTransaction(status string, ID int) (models.Transaction, error)
	DeleteTransaction(transaction models.Transaction, ID int) (models.Transaction, error)
	GetPayment(transaction models.Transaction) (models.Transaction, error)
}

func (r *repository) FindTransactions() ([]models.Transaction, error) {
	var transactions []models.Transaction
	// err := r.db.Raw("SELECT * FROM users").Scan(&users).Error
	err := r.db.Preload("User").Preload("Ticket").Preload("Ticket.StartStation").Preload("Ticket.DestinationStation").Find(&transactions).Error

	return transactions, err
}

func (r *repository) GetTransaction(transactionId int) (models.Transaction, error) {
	var transaction models.Transaction
	// err := r.db.Raw("SELECT * FROM users WHERE id = ?", ID).Scan(&user).Error
	err := r.db.Preload("User").Preload("Ticket").Preload("Ticket.StartStation").Preload("Ticket.DestinationStation").First(&transaction, transactionId).Error

	return transaction, err
}

func (r *repository) CreateTransaction(transaction models.Transaction) (models.Transaction, error) {
	// err := r.db.Exec("INSERT INTO users(name, email, password) VALUES(?,?,?)", user.Name, user.Email, user.Password).Error
	err := r.db.Create(&transaction).Error
	return transaction, err
}

func (r *repository) UpdateTransaction(status string, ID int) (models.Transaction, error) {
	var transaction models.Transaction

	r.db.First(&transaction, ID)
	fmt.Println(status)

	if status != transaction.Status && status == "success" {
		r.db.First(&transaction, transaction.ID)
	}

	transaction.Status = status
	err := r.db.Save(&transaction).Error

	return transaction, err
}

func (r *repository) DeleteTransaction(transaction models.Transaction, ID int) (models.Transaction, error) {
	err := r.db.Delete(&transaction, ID).Error

	return transaction, err
}

func (r *repository) GetPayment(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Save(&transaction).Error

	return transaction, err
}
