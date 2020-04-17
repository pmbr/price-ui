package main

import (
	"fmt"
	"log"
	"strconv"

	"net/http"
	"encoding/json"

	"github.com/gorilla/mux"
)

type Product struct { 
	Id          int      `json:"id"` 
	Description string   `json:"description"` 
	Price       float32  `json:"price"` 
	MaxDiscount float32  `json:"maxDiscount"` 
}

var product1 Product = Product {
				Id: 1, 
				Description: "Blue Jeans", 
				Price: 1.01, 
				MaxDiscount: 0.5,
			}

var product2 Product = Product {
				Id: 2, 
				Description: "Green T-Shirt", 
				Price: 2.99,
				MaxDiscount: 0.3,
			} 

var product3 Product = Product {
				Id: 3, 
				Description: "White Skirt", 
				Price: 0, 
				MaxDiscount: 0,
			} 

var products = []Product { product1, product2, product3, }

func getAll(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
    w.Header().Set("Access-Control-Allow-Credentials", "true")

    w.WriteHeader(http.StatusOK)

    json.NewEncoder(w).Encode(products) 
}

func get(w http.ResponseWriter, r *http.Request) {

	pathParams := mux.Vars(r)

    id := -1
    var err error
    if val, ok := pathParams["id"]; ok {
        id, err = strconv.Atoi(val)
        if err != nil {
    		w.Header().Set("Content-Type", "application/json")
            w.WriteHeader(http.StatusInternalServerError)
            w.Write([]byte(`{"error": "id invalid"}`))
            return
        }
    } else {
		w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(http.StatusInternalServerError)
        w.Write([]byte(`{"error": "id required"}`))
        return

    }

    fmt.Print("get id", id)

    w.Header().Set("Content-Type", "application/json")
    w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
    w.WriteHeader(http.StatusOK)
    w.Write([]byte(`{"message": "get called"}`))
}

func post(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(http.StatusCreated)
}

func put(w http.ResponseWriter, r *http.Request) {
	pathParams := mux.Vars(r)

    id := -1
    var err error
    if val, ok := pathParams["id"]; ok {
        id, err = strconv.Atoi(val)
        if err != nil {
    		w.Header().Set("Content-Type", "application/json")
            w.WriteHeader(http.StatusInternalServerError)
            w.Write([]byte(`{"error": "id invalid"}`))
            return
        }
    } else {
		w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(http.StatusInternalServerError)
        w.Write([]byte(`{"error": "id required"}`))
        return

    }

    fmt.Print("update id", id)

    w.WriteHeader(http.StatusAccepted)
}

func delete(w http.ResponseWriter, r *http.Request) {
	pathParams := mux.Vars(r)

    id := -1
    var err error
    if val, ok := pathParams["id"]; ok {
        id, err = strconv.Atoi(val)
        if err != nil {
    		w.Header().Set("Content-Type", "application/json")
            w.WriteHeader(http.StatusInternalServerError)
            w.Write([]byte(`{"error": "id invalid"}`))
            return
        }
    } else {
		w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(http.StatusInternalServerError)
        w.Write([]byte(`{"error": "id required"}`))
        return

    }

    log.Print("delete id", id)

    w.WriteHeader(http.StatusOK)
}

func notFound(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(http.StatusMethodNotAllowed)
}

func main() {
    r := mux.NewRouter()

    r.HandleFunc("/", getAll).Methods(http.MethodGet)
    r.HandleFunc("/{id}", get).Methods(http.MethodGet)
    r.HandleFunc("/", post).Methods(http.MethodPost)
    r.HandleFunc("/{id}", put).Methods(http.MethodPut)
    r.HandleFunc("/{id}", delete).Methods(http.MethodDelete)
    r.HandleFunc("/", notFound)

    log.Fatal(http.ListenAndServe("localhost:8080", r))
}