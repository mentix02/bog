package models

import (
	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	gorm.Model
	Name     string    `json:"name"`
	Posts    []Post    `json:"posts"`
	Comments []Comment `json:"comments"`
	Key      string    `json:"key" gorm:"index"`
	Password string    `json:"password" binding:"required"`
	Username string    `json:"username" gorm:"index" binding:"required"`
}

func (u *User) BeforeCreate(_ *gorm.DB) error {
	u.Key, _ = randomHex(20)
	u.Password = hashPassword(u.Password)
	return nil
}

func (u *User) CheckPassword(rawPassword string) bool {
	return bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(rawPassword)) == nil
}
