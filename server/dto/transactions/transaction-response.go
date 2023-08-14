package transactionsdto

type TransactionResponse struct {
	ID       int    `json:"id"`
	UserID   int    `json:"user_id"`
	TicketID int    `json:"ticket_id"`
	Status   string `json:"status"`
	// Image    string `json:"image"`
}
