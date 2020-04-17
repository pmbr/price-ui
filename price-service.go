package main

import (
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

type Error struct { 
	ErrorCode    int    `json:"errorCode"` 
	ErrorMessage string `json:"errorMessage"` 
	ErrorDetails string `json:"errorDetails"` 
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
    addResponseHeaders(w)
    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(products) 
}

func get(w http.ResponseWriter, r *http.Request) {
	addResponseHeaders(w)
    if id, ok := extractIdFromPathParams(w, r); ok {
		for _, product := range products {
			if (product.Id == id) {
		    	w.WriteHeader(http.StatusOK)
    			json.NewEncoder(w).Encode(product) 
	    		log.Print("get returned id ", id)
    			return;
			}
		}
		log.Print("get found no id ", id)
    	w.WriteHeader(http.StatusNotFound)    	
    	json.NewEncoder(w).Encode( Error { ErrorMessage: "no price found for id" })
    }
}

func post(w http.ResponseWriter, r *http.Request) {
	addResponseHeaders(w)
    w.WriteHeader(http.StatusCreated)
}

func put(w http.ResponseWriter, r *http.Request) {
	addResponseHeaders(w)
    if id, ok := extractIdFromPathParams(w, r); ok {
	    log.Print("updated id ", id)
    	w.WriteHeader(http.StatusOK)
    }
}

func delete(w http.ResponseWriter, r *http.Request) {
	addResponseHeaders(w)
    if id, ok := extractIdFromPathParams(w, r); ok {
		for index, product := range products {
			if (product.Id == id) {
				products = append(products[:index], products[index+1:]...)
		    	w.WriteHeader(http.StatusOK)
			    log.Print("deleted id ", id)
    			return;
			}
		}
		log.Print("delete found no id ", id)
    	w.WriteHeader(http.StatusNotFound)    	
    	json.NewEncoder(w).Encode( Error { ErrorMessage: "no price found for id" })
    }
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

func extractIdFromPathParams(w http.ResponseWriter, r *http.Request) (int, bool) {
	pathParams := mux.Vars(r)
    id := -1
    var err error
    if val, ok := pathParams["id"]; ok {
        id, err = strconv.Atoi(val)
        if err != nil {
            w.WriteHeader(http.StatusInternalServerError)
	    	json.NewEncoder(w).Encode( Error { ErrorMessage: "id invalid" })
            log.Print("received request with invalid id ", val)
            return -1, false
        }
    } else {
        w.WriteHeader(http.StatusInternalServerError)
	    json.NewEncoder(w).Encode( Error { ErrorMessage: "id required" })
        log.Print("received request with id missing")
        return -1, false

    }
    return id, true
}

func addResponseHeaders(w http.ResponseWriter) {
    w.Header().Set("Content-Type", "application/json")
    w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
    w.Header().Set("Access-Control-Allow-Credentials", "true")	
}