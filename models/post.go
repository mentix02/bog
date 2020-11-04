package models

import (
	"errors"
	"github.com/gosimple/slug"
	"github.com/jinzhu/gorm"
)

type Post struct {
	gorm.Model
	UserName string    `json:"user"`
	Comments []Comment `json:"comments"`
	Slug     string    `json:"slug" gorm:"uniqueIndex"`
	Title    string    `json:"title" binding:"required"`
	UserID   uint      `json:"user_id" gorm:"index:idx_user_id"`
	Content  string    `json:"content" gorm:"type:text" binding:"required"`
}

func (p *Post) BeforeCreate(db *gorm.DB) error {
	p.Slug = slug.Make(p.Title)
	type tempUsernameStruct struct {
		Username string
	}
	var tempStruct tempUsernameStruct
	if err := db.Select("username").Table("users").Where("id = ?", p.UserID).Scan(&tempStruct).Error; err != nil {
		return errors.New("user not found")
	}
	p.UserName = tempStruct.Username
	return nil
}
