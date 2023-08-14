package repository

import (
	"landtick-be/models"
)

type StationRepository interface {
	FindStations() ([]models.Station, error)
	GetStation(ID int) (models.Station, error)
	CreateStation(station models.Station) (models.Station, error)
	UpdateStation(station models.Station) (models.Station, error)
	DeleteStation(station models.Station) (models.Station, error)
}

func (r *repository) FindStations() ([]models.Station, error) {
	var stations []models.Station
	// err := r.db.Raw("SELECT * FROM users").Scan(&users).Error
	err := r.db.Find(&stations).Error

	return stations, err
}

func (r *repository) GetStation(ID int) (models.Station, error) {
	var station models.Station
	// err := r.db.Raw("SELECT * FROM users WHERE id = ?", ID).Scan(&user).Error
	err := r.db.First(&station, ID).Error

	return station, err
}

func (r *repository) CreateStation(station models.Station) (models.Station, error) {
	// err := r.db.Exec("INSERT INTO users(name, email, password) VALUES(?,?,?)", user.Name, user.Email, user.Password).Error
	err := r.db.Create(&station).Error
	return station, err
}

func (r *repository) UpdateStation(station models.Station) (models.Station, error) {
	// err := r.db.Raw("UPDATE users SET name=?, email=?, password=?, updated_at=? WHERE id = ?", user.Name, user.Email, user.Password, user.UpdatedAt, ID).Scan(&user).Error
	err := r.db.Save(&station).Error
	return station, err
}

func (r *repository) DeleteStation(station models.Station) (models.Station, error) {
	// err := r.db.Raw("DELETE FROM users WHERE id=?", ID).Scan(&user).Error
	err := r.db.Delete(&station).Error
	return station, err
}
