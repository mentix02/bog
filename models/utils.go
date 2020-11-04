package models

import (
	"crypto/rand"
	"encoding/hex"
	"errors"
	"github.com/jinzhu/gorm"

	"golang.org/x/crypto/bcrypt"
)

func hashPassword(password string) string {
	bytes, _ := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes)
}

func getUsernameById(id uint, db *gorm.DB) (string, error) {
	type tempUsernameStruct struct {
		Username string
	}
	var tempStruct tempUsernameStruct
	if err := db.Select("username").Table("users").Where("id = ?", id).Scan(&tempStruct).Error; err != nil {
		return "", errors.New("user not found")
	} else {
		return tempStruct.Username, nil
	}
}

func randomHex(n int) (string, error) {
	bytes := make([]byte, n)
	if _, err := rand.Read(bytes); err != nil {
		return "", err
	}
	return hex.EncodeToString(bytes), nil
}
