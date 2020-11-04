package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mentix02/bog/models"
)

func CreateComment(c *gin.Context) {
	var (
		post    models.Post
		comment models.Comment
	)
	postID := c.Params.ByName("post_id")
	if err := DB.Table("posts").Select("id").Where("id = ?", postID).First(&post).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, "post not found")
	} else {
		_ = c.BindJSON(&comment)
		userID, _ := c.Get("UserID")
		comment.UserID = userID.(uint)
		comment.PostID = post.ID
		DB.Create(&comment)
		c.JSON(http.StatusCreated, comment)
	}
}

func DeletePostComment(c *gin.Context) {
	commentID := c.Params.ByName("comment_id")
	var comment models.Comment
	userID, _ := c.Get("UserID")
	if err := DB.Table("comments").Where("id = ?", commentID).First(&comment).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, "Comment not found.")
	} else {
		if comment.UserID != userID {
			c.AbortWithStatusJSON(http.StatusUnauthorized, "Cannot perform action.")
		}
		DB.Where("id = ?", comment.ID).Delete(&comment)
		c.JSON(http.StatusOK, "deleted comment")
	}
}

func GetPostComments(c *gin.Context) {
	postID := c.Params.ByName("post_id")
	var comments []models.Comment
	if err := DB.Where("post_id = ?", postID).Order("created_at DESC").Find(&comments).Error; err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, comments)
	}
}
