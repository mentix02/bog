package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mentix02/bog/models"
)

type credentials struct {
	Username, Password string `binding:"required"`
}

func GetUser(c *gin.Context) {
	username := c.Params.ByName("username")
	var user models.User
	if err := DB.Where("username = ?", username).First(&user).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, "user does not exist")
	} else {
		c.JSON(http.StatusOK, user)
	}
}

func GetUsers(c *gin.Context) {
	var users []models.User
	DB.Table("users").Find(&users)
	c.JSON(http.StatusOK, users)
}

func CreateUser(c *gin.Context) {
	var user, userExists models.User
	err := c.BindJSON(&user)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, "Data not provided.")
	} else if err = DB.
		Table("users").
		Select("id").
		Where("username = ?", user.Username).
		First(&userExists).Error; err != nil {
		println("not found users!")
		c.AbortWithStatusJSON(http.StatusBadRequest, "User already exists.")
	} else {
		DB.Create(&user)
		c.JSON(http.StatusCreated, user)
	}
}

func GetUserPosts(c *gin.Context) {
	username := c.Params.ByName("username")
	var user models.User
	if err := DB.
		Table("users").
		Select("id").
		Where("username = ?", username).
		First(&user).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, "user does not exist")
	} else {
		var posts []models.Post
		DB.Table("posts").Where("user_id = ?", user.ID).Find(&posts)
		c.JSON(http.StatusOK, posts)
	}
}

func GetToken(c *gin.Context) {
	var user models.User
	var creds credentials
	err := c.BindJSON(&creds)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, err.Error())
	} else {
		if err = DB.
			Table("users").
			Select("password", "key").
			Where("username = ?", creds.Username).
			First(&user).Error; err == nil && user.CheckPassword(creds.Password) {
			c.JSON(http.StatusOK, map[string]string{"token": user.Key})
		} else {
			c.AbortWithStatusJSON(http.StatusUnauthorized, map[string]string{"error": "invalid credentials"})
		}
	}
}
