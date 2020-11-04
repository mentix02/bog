package models

import "github.com/jinzhu/gorm"

type Comment struct {
	gorm.Model
	UserName string `json:"user"`
	PostID   uint   `json:"post_id" gorm:"index"`
	UserID   uint   `json:"user_id" gorm:"index"`
	Content  string `json:"content" gorm:"type:text" binding:"required"`
}

func (c *Comment) BeforeCreate(db *gorm.DB) error {
	username, err := getUsernameById(c.UserID, db)
	if err != nil {
		return err
	} else {
		c.UserName = username
	}
	return nil
}
