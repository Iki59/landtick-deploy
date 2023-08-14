package repository

import (
	"landtick-be/models"
)

type UserRepository interface {
	FindUsers() ([]models.User, error)
	GetUser(ID int) (models.User, error)
	UpdateUser(user models.User) (models.User, error)
	DeleteUser(user models.User) (models.User, error)
}

func (r *repository) FindUsers() ([]models.User, error) {
	var users []models.User
	// err := r.db.Raw("SELECT * FROM users").Scan(&users).Error
	err := r.db.Find(&users).Error

	return users, err
}

func (r *repository) GetUser(ID int) (models.User, error) {
	var user models.User
	// err := r.db.Raw("SELECT * FROM users WHERE id = ?", ID).Scan(&user).Error
	err := r.db.First(&user, ID).Error

	return user, err
}

func (r *repository) UpdateUser(user models.User) (models.User, error) {
	// err := r.db.Raw("UPDATE users SET name=?, email=?, password=?, updated_at=? WHERE id = ?", user.Name, user.Email, user.Password, user.UpdatedAt, ID).Scan(&user).Error
	err := r.db.Save(&user).Error
	return user, err
}

func (r *repository) DeleteUser(user models.User) (models.User, error) {
	// err := r.db.Raw("DELETE FROM users WHERE id=?", ID).Scan(&user).Error
	err := r.db.Delete(&user).Error
	return user, err
}
