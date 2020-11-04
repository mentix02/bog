package handlers

import (
	"github.com/jinzhu/gorm"
	"github.com/mentix02/bog/models"
)

var DB *gorm.DB

func Init() *gorm.DB {
	DB, _ = gorm.Open("sqlite3", "./bog.db")
	DB.AutoMigrate(&models.Post{}, &models.User{}, &models.Comment{})
	return DB
}
