package main

import (
	"fmt"
	"net/http"
)

func AuthControl(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		session, _ := store.Get(r, "session-name")
		auth := true
		/*
			if auth, ok := session.Values["authenticated"].(bool); !ok || !auth {
				http.Error(w, "Forbidden", http.StatusForbidden)
				return
			}*/
		fmt.Println(session.Values["authenticated"])
		//if session.Values["authenticated"] != true {
		if auth != true {
			http.Error(w, "Forbidden", http.StatusForbidden)
			return
		} else {
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Credentials", "true")
			w.Header().Add("Content-Type", "application/json")
			next(w, r)
		}

	}
}
