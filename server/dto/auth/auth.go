package authdto

type AuthRequest struct {
	FullName string `json:"full_name" form:"full_name" validation:"required"`
	Username string `json:"username" form:"username" validation:"required"`
	Email    string `json:"email" form:"email" validation:"required"`
	Password string `json:"password" form:"password" validation:"required"`
	Gender   string `json:"gender" form:"gender" validation:"required"`
	Telepon  string `json:"telepon" form:"telepon" validation:"required"`
	Adress   string `json:"adress" form:"adress" validation:"required"`
}

type LoginRequest struct {
	Username string `json:"username" form:"username" validate:"required"`
	Password string `json:"password" form:"password" validate:"required"`
}

type LoginResponse struct {
	FullName string `json:"full_name"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Token    string `json:"token"`
	Role     string `json:"role"`
}

type CheckAuthResponse struct {
	Id       int    `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Role     string `json:"role"`
}
