package main

import (
	"log"
	"strconv"

	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
)

type Price struct {
	Id                 int     `json:"id"`
	ProductId          int     `json:"productId"`
	ProductDescription string  `json:"productDescription"`
	Price              float32 `json:"price"`
	StartDate          string  `json:"startDate"`
	EndDate            string  `json:"endDate"`
	MaxDiscount        float32 `json:"maxDiscount"`
}

type Error struct {
	ErrorCode    int    `json:"errorCode"`
	ErrorMessage string `json:"errorMessage"`
	ErrorDetails string `json:"errorDetails"`
}

var price1 Price = Price{
	Id:                 1,
	ProductId:          10,
	ProductDescription: "Blue Jeans",
	Price:              1.01,
	StartDate:          "05/31/2020",
	EndDate:            "06/18/2020",
	MaxDiscount:        0.5,
}

var price2 Price = Price{
	Id:                 2,
	ProductId:          20,
	ProductDescription: "Green T-Shirt",
	Price:              2.99,
	StartDate:          "01/01/2020",
	EndDate:            "12/31/2020",
	MaxDiscount:        0.3,
}

var price3 Price = Price{
	Id:                 3,
	ProductId:          30,
	ProductDescription: "White Skirt",
	Price:              0,
	StartDate:          "",
	EndDate:            "",
	MaxDiscount:        0,
}

var price4 Price = Price{
	Id:                 4,
	ProductId:          10,
	ProductDescription: "Blue Jeans",
	Price:              1.67,
	StartDate:          "06/19/2020",
	EndDate:            "06/30/2020",
	MaxDiscount:        0,
}

var prices = []Price{price1, price2, price3, price4}

func getAll(w http.ResponseWriter, r *http.Request) {
	addResponseHeaders(w)
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(prices)
}

func get(w http.ResponseWriter, r *http.Request) {
	addResponseHeaders(w)
	if id, ok := extractIdFromPathParams(w, r); ok {
		for _, price := range prices {
			if price.Id == id {
				w.WriteHeader(http.StatusOK)
				json.NewEncoder(w).Encode(price)
				log.Print("get method - service returned price with id: ", id)
				return
			}
		}
		log.Print("get method - service could not find price with id: ", id)
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(Error{ErrorMessage: "no price found for id"})
	}
}

func post(w http.ResponseWriter, r *http.Request) {
	addResponseHeaders(w)
	if postPrice, ok := convertRequestPayloadToPriceStruct(w, r); ok {
		for _, price := range prices {
			if price.Id == postPrice.Id {
				w.WriteHeader(http.StatusBadRequest)
				json.NewEncoder(w).Encode(Error{ErrorMessage: "id duplicate"})
				log.Print("post method - attempted to create new price with existing id: ", postPrice.Id)
				return
			}
		}
		prices = append(prices, postPrice)
		log.Print("post method - created new price with id: ", postPrice.Id)
		w.WriteHeader(http.StatusCreated)
	}
}

func put(w http.ResponseWriter, r *http.Request) {
	addResponseHeaders(w)
	if id, ok := extractIdFromPathParams(w, r); ok {
		if putPrice, ok := convertRequestPayloadToPriceStruct(w, r); ok {
			if id != putPrice.Id {
				w.WriteHeader(http.StatusBadRequest)
				json.NewEncoder(w).Encode(Error{ErrorMessage: "request id and payload id must match"})
				log.Print("request id and payload id do not match")
				return
			}
			for index, price := range prices {
				if price.Id == putPrice.Id {
					prices[index] = putPrice
					log.Print("updated id ", id)
					w.WriteHeader(http.StatusOK)
					return
				}
			}
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(Error{ErrorMessage: "no price found with id on request"})
			log.Print("put method - no price found with id: ", putPrice.Id)
		}
	}
}

func delete(w http.ResponseWriter, r *http.Request) {
	addResponseHeaders(w)
	if id, ok := extractIdFromPathParams(w, r); ok {
		for index, price := range prices {
			if price.Id == id {
				prices = append(prices[:index], prices[index+1:]...)
				w.WriteHeader(http.StatusOK)
				log.Print("deleted id ", id)
				return
			}
		}
		log.Print("delete found no id ", id)
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(Error{ErrorMessage: "no price found for id"})
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
			json.NewEncoder(w).Encode(Error{ErrorMessage: "id invalid"})
			log.Print("received request with invalid id ", val)
			return id, false
		}
	} else {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(Error{ErrorMessage: "id required"})
		log.Print("received request with id missing")
		return id, false
	}
	return id, true
}

func convertRequestPayloadToPriceStruct(w http.ResponseWriter, r *http.Request) (Price, bool) {
	var putPrice Price
	err := json.NewDecoder(r.Body).Decode(&putPrice)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(Error{ErrorMessage: "invalid payload body"})
		log.Print("invalid payload body")
		return putPrice, false
	}
	return putPrice, true
}

func addResponseHeaders(w http.ResponseWriter) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
}
