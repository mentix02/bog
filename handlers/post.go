package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mentix02/bog/models"
)

func GetPost(c *gin.Context) {
	slug := c.Params.ByName("slug")
	var post models.Post
	if err := DB.Where("slug = ?", slug).First(&post).Preload("Comments").Error; err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, "post not found")
	} else {
		c.JSON(http.StatusOK, post)
	}
}

func GetPosts(c *gin.Context) {
	var posts []models.Post
	DB.Raw("SELECT id, slug, user_name, created_at, content, title FROM posts ORDER BY created_at DESC").Scan(&posts)
	c.JSON(http.StatusOK, posts)
}

func DeletePost(c *gin.Context) {
	slug := c.Params.ByName("slug")
	var post models.Post
	userID, _ := c.Get("UserID")
	if err := DB.Where("slug = ?", slug).First(&post).Error; err != nil {
		if post.UserID != userID {
			c.AbortWithStatusJSON(http.StatusUnauthorized, post)
		}
		DB.Where("id = ?", post.ID).Delete(&post)
		c.JSON(http.StatusOK, post)
	} else {
		c.JSON(http.StatusUnauthorized, post)
	}
}

func CreatePost(c *gin.Context) {
	var post models.Post
	userID, _ := c.Get("UserID")
	post.UserID = userID.(uint)
	err := c.BindJSON(&post)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, err.Error())
	} else {
		DB.Create(&post)
		c.JSON(http.StatusOK, post)
	}
}
