package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	"github.com/mentix02/bog/handlers"
	"log"
)

var db *gorm.DB

func main() {

	router := gin.Default()

	// Configure CORS
	corsConfig := cors.DefaultConfig()

	corsConfig.AllowAllOrigins = true
	corsConfig.AllowCredentials = true
	corsConfig.AddAllowMethods("OPTIONS")
	router.Use(cors.New(cors.Config{
		AllowAllOrigins:  true,
		AllowMethods:     []string{"GET", "PUT", "PATCH", "POST", "DELETE"},
		AllowHeaders:     []string{"Origin", "Authorization", "Content-Type", "Accept", "Content-Length"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	db = handlers.Init()
	defer db.Close()

	v1 := router.Group("/v1")
	{
		postRouter := v1.Group("/posts")
		postAuthRouter := v1.Group("/posts")
		postAuthRouter.Use(AuthMiddleware)
		postAuthRouter.Use(cors.New(corsConfig))
		{
			postRouter.GET("", handlers.GetPosts)
			postAuthRouter.POST("", handlers.CreatePost)
			postRouter.GET("/:slug", handlers.GetPost)
			postAuthRouter.DELETE("/:slug", handlers.DeletePost)
		}

		userRouter := v1.Group("/users")
		userAuthRouter := v1.Group("/users")
		userAuthRouter.Use(AuthMiddleware)
		{
			userRouter.GET("", handlers.GetUsers)
			userRouter.POST("", handlers.CreateUser)
			userRouter.POST("/token", handlers.GetToken)
			userRouter.GET("/:username", handlers.GetUser)
			userRouter.GET("/:username/posts", handlers.GetUserPosts)
		}

		commentRouter := v1.Group("/comments")
		commentAuthRouter := v1.Group("/comments")
		commentAuthRouter.Use(AuthMiddleware)
		{
			commentRouter.GET("/:post_id", handlers.GetPostComments)
			commentAuthRouter.POST("/:post_id", handlers.CreateComment)
			commentAuthRouter.DELETE("/:comment_id", handlers.DeletePostComment)
		}
	}

	log.Fatalln(router.Run(":8080"))
}
