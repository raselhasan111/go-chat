package main

import (
	"log"
	"net/http"
)

func main() {
	setupAPI()

	// Serve on port :8080
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func setupAPI() {
	// Create a Manager instance used to handle Websocket connections
	manager := NewManager()

	// Serve the ./frontend dir at Route /
	http.Handle("/", http.FileServer(http.Dir("./frontend")))
	http.HandleFunc("/ws", manager.serveWS)
}
