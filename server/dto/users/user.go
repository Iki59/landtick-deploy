package usersdto

type CreateUserRequest struct {
	FullName string `json:"full_name" form:"full_name" validation:"required"`
	Username string `json:"username" form:"username" validation:"required"`
	Email    string `json:"email" form:"email" validation:"required"`
	Telepon  string `json:"telepon" form:"telepon" validation:"required"`
}

type UpdateUserRequest struct {
	FullName string `json:"full_name" form:"full_name"`
	Username string `json:"username" form:"username"`
	Email    string `json:"email" form:"email"`
	Telepon  string `json:"telepon" form:"telepon"`
}

type UserResponse struct {
	ID       int    `json:"id"`
	FullName string `json:"full_name" form:"full_name" validate:"required"`
	Username string `json:"username" form:"username" validate:"required"`
	Email    string `json:"email" form:"email" validate:"required"`
	Telepon  string `json:"telepon" form:"telepon" validate:"required"`
}
