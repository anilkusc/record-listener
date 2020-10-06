package main

type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type RecordDay struct {
	Date string `json:"date"`
}
type Success struct {
	Auth bool `json:"Authenticated"`
}

type Record struct {
	Name   string `json:"name"`
	Type   string `json:"type"`
	Called string `json:"called"` //aranan
	Caller string `json:"caller"` //arayan
	Date   string `json:"date"`
	Time   string `json:"time"`
}
