package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mentix02/bog/models"
)

func AuthMiddleware(c *gin.Context) {
	var user models.User
	if err := db.Table("users").Select("id").Where("key = ?",
		c.GetHeader("Authorization")).First(&user).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, map[string]string{"error": "unauthorized action"})
	} else {
		c.Set("UserID", user.ID)
		c.Next()
	}
}
