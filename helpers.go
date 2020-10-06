package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"strings"
)

func ListDirs(date string) string {
	var records []Record
	files, err := ioutil.ReadDir("./frontend/public/records/" + date)
	if err != nil {
		log.Println(err)
		return "{'status':'false'}"
	}
	for _, f := range files {
		var record Record
		recordString := strings.Split(f.Name(), "-")
		record.Name = f.Name() //recordString[5][:10]
		record.Type = recordString[0]
		record.Called = recordString[1]
		record.Caller = recordString[2]
		record.Date = recordString[3][:4] + "/" + recordString[3][4:6] + "/" + recordString[3][6:]
		record.Time = recordString[4][:2] + ":" + recordString[4][2:4] + ":" + recordString[4][4:]
		records = append(records, record)
	}
	json, err := json.Marshal(records)
	if err != nil {
		log.Println(err)
		return "{'status':'false'}"
	}
	return string(json)
}
