package models

type User struct {
	ID       int    `json:"id" gorm:"primaryKey:autoIncrement"`
	FullName string `json:"full_name" gorm:"type: varchar(255)"`
	Username string `json:"username" gorm:"type: varchar(255)"`
	Email    string `json:"email" gorm:"type: varchar(255)"`
	Password string `json:"password" gorm:"type: varchar(255)"`
	Gender   string `json:"gender" gorm:"type: varchar(255)"`
	Telepon  string `json:"telepon" gorm:"type: varchar(255)"`
	Adress   string `json:"adress" gorm:"type: varchar(255)"`
	Role     string `json:"role" gorm:"type:varchar(255)"`
}

type UserResponseTransaction struct {
	Id       int    `json:"id"`
	FullName string `json:"full_name"`
	Email    string `json:"email"`
	Telepon  string `json:"telepon"`
}

type UserResponseTicket struct {
	Id       int    `json:"id"`
	FullName string `json:"full_name"`
	Email    string `json:"email"`
}

func (UserResponseTransaction) TableName() string {
	return "users"
}

func (UserResponseTicket) TableName() string {
	return "users"
}
