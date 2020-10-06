package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/gorilla/sessions"
)

var (
	// key must be 16, 24 or 32 bytes long (AES-128, AES-192 or AES-256)
	key      = []byte("super-secret-key")
	store    = sessions.NewCookieStore(key)
	USERNAME = os.Getenv("USER")
	PASSWORD = os.Getenv("PASS")
)

func List(w http.ResponseWriter, r *http.Request) {

	var searchDate RecordDay
	err := json.NewDecoder(r.Body).Decode(&searchDate)
	if err != nil {
		io.WriteString(w, `{"status":"false"}`)
		return
	}
	fmt.Fprintf(w, ListDirs(searchDate.Date))
}

func Login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	w.Header().Add("Content-Type", "application/json")

	session, _ := store.Get(r, "session-name")
	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		io.WriteString(w, `{"authenticated":"false"}`)
		return
	}
	username := user.Username
	password := user.Password
	if USERNAME == "" {
		USERNAME = "admin"
	}
	if PASSWORD == "" {
		PASSWORD = "admin"
	}
	if username == USERNAME && password == PASSWORD {
		session.Values["authenticated"] = true
		session.Save(r, w)
		io.WriteString(w, `{"authenticated":"true"}`)
		return
	} else {
		session.Values["authenticated"] = false
		session.Save(r, w)
		io.WriteString(w, `{"authenticated":"false"}`)
		return
	}
}

func Logout(w http.ResponseWriter, r *http.Request) {

	session, _ := store.Get(r, "session-name")
	session.Values["authenticated"] = false
	session.Options.MaxAge = 0
	session.Save(r, w)
	io.WriteString(w, `{"authenticated":"false"}`)
	return
}

func main() {

	r := mux.NewRouter()

	r.HandleFunc("/list", AuthControl(List)).Methods("POST")
	r.HandleFunc("/login", Login).Methods("POST")
	r.HandleFunc("/logout", Logout).Methods("POST")
	fmt.Println("Servin on :8080")
	//http.ListenAndServeTLS(":8080", "./certs/server.crt", "./certs/server.key", r)
	http.ListenAndServe(":8080", r)
}
