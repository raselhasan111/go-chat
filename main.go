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
	// Serve the ./frontend dir at Route /
	http.Handle("/", http.FileServer(http.Dir("./frontend")))
}
