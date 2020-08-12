package main

import (
	"encoding/hex"
	"encoding/json"
	"encoding/xml"
	"fmt"
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/gorilla/mux"
	"golang.org/x/crypto/salsa20"
)

//Xmls Структура голвного файла xml
type Xmls struct {
	Rates []Item `xml:"item"`
}

//Item Структура элементов катировок в xml
type Item struct {
	From      string  `xml:"from"`
	To        string  `xml:"to"`
	In        float64 `xml:"in"`
	Out       float64 `xml:"out"`
	Amount    int     `xml:"amount"`
	MinAmount string  `xml:"minamount"`
	MaxAmount string  `xml:"maxamount"`
	Param     string  `xml:"param"`
	City      string  `xml:"city"`
}

//Post Структура отвечает за получения о клиента json
type Post struct {
	Text string `json:"Text"`
	Key  string `json:"Key"`
}

//Out Структура отвечает за отправку клиенту json
type Out struct {
	Text string
}

//Controller Контроллер, отвечает за кэш xml
type Controller struct {
	cashe map[string]Xmls
	mux   sync.Mutex
}

//Set Сеттер устанавливает значение в кеш по ключу
func (C *Controller) Set(key string, xml Xmls) {
	C.mux.Lock()
	defer C.mux.Unlock()

	C.cashe[key] = xml
}

//Get Геттре получает значение по ключу
func (C *Controller) Get(key string, xml *Xmls, ch chan bool) {
	C.mux.Lock()
	defer C.mux.Unlock()

	v, err := C.cashe[key]
	*xml = v
	ch <- err
}

//Courses Функция отвечает за обработку запроса /courses
func (C *Controller) Courses(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var xmlBuf Xmls
	err := make(chan bool)

	go C.Get("xml", &xmlBuf, err)
	// тк get отправляется в горутину то нужно подождать когда он закончит, поэтому у if стоит ожидание на err
	if <-err == false {
		xmlGet, err := http.Get("https://test.cryptohonest.ru/request-exportxml.xml")
		if err != nil {
			fmt.Print(err)
		}
		err = xml.NewDecoder(xmlGet.Body).Decode(&xmlBuf)
		if err != nil {
			fmt.Print(err)
		}
		go C.Set("xml", xmlBuf)
	}

	json.NewEncoder(w).Encode(xmlBuf)
}

//Crypto функция кодирующая или декодироющая текст
func Crypto(methode, textIn, key string) string {
	if l := []byte(key); len(l) == 32 {
		var bKey [32]byte
		nonce := []byte("iNyluWfE")
		for i := 0; i < 32; i++ {
			bKey[i] = l[i]
		}

		switch methode {
		case "encode":
			bTextIn, bTextOut := []byte(textIn), make([]byte, len(textIn))
			salsa20.XORKeyStream(bTextOut, bTextIn, nonce, &bKey)
			return hex.EncodeToString(bTextOut)
		case "decode":
			bTextIn, err := hex.DecodeString(textIn)
			if err != nil {
				return "Ошибка при hex декодировании"
			}
			bTextOut := make([]byte, len(bTextIn))
			salsa20.XORKeyStream(bTextOut, bTextIn, nonce, &bKey)
			return string(bTextOut)
		}
	}
	return "Ключ не [32]byte"
}

//Encode Функция отвечает за обработку запроса /encode (шифрование текста)
func Encode(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var post Post
	var out Out
	json.NewDecoder(r.Body).Decode(&post)
	out.Text = Crypto("encode", post.Text, post.Key)
	json.NewEncoder(w).Encode(out)
}

//Decode Функция отвечает за обработку запроса /decode (расшифровка текста)
func Decode(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var post Post
	var out Out
	json.NewDecoder(r.Body).Decode(&post)
	out.Text = Crypto("decode", post.Text, post.Key)
	json.NewEncoder(w).Encode(out)
}

func main() {
	var C = Controller{cashe: make(map[string]Xmls)}
	r := mux.NewRouter()
	r.HandleFunc("/courses", C.Courses).Methods("GET")
	r.HandleFunc("/encode", Encode).Methods("POST")
	r.HandleFunc("/decode", Decode).Methods("POST")

	srv := &http.Server{
		Handler:      r,
		Addr:         "localhost:8000",
		WriteTimeout: time.Second * 15,
		ReadTimeout:  time.Second * 15,
		IdleTimeout:  time.Second * 60,
	}

	log.Fatal(srv.ListenAndServe())
}
