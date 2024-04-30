package main

import (
	"errors"
	"net/http"
	"sort"
	"strconv"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

//create struct to store video games
type videoGame struct{
	ID			string	`json:"id"`
	Title		string	`json:"title"`
	Developer	string	`json:"developer"`
	Year		int		`json:"year"`
	Rank		int		`json:"rank"`
}

//Data Structure for videogames
var videoGames = []videoGame{
	{ID: "1", Title: "Sonic the Hedgehog", Developer: "Sega", Year: 1991, Rank: 4},
	{ID: "2", Title: "The Legend of Zelda: Link's Awakening", Developer: "Nintendo", Year: 1993, Rank: 2},
	{ID: "3", Title: "GoldenEye 007", Developer: "Rare", Year: 1997, Rank: 5},
	{ID: "4", Title: "Metroid Prime", Developer: "Retro Studios", Year: 2002, Rank: 1},
	{ID: "5", Title: "Shadow of the Colossus", Developer: "Japan Studio and Team Ico", Year: 2005, Rank: 3},
}

//api call to get video games with gin context middleware, also utilizing JSON methods
func getVideoGames(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, videoGames)
}

func videoGameById(c *gin.Context) {
	id := c.Param("id")
	videoGame, err := getVideoGameById(id)

	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Video game not found"})
		return
	}

	c.IndentedJSON(http.StatusOK, videoGame)
}

func getVideoGameById(id string) (*videoGame, error) {
	
	for i, vg := range videoGames {
		if vg.ID == id {
			return &videoGames[i], nil
		}
	}
	return nil, errors.New("video game not found")
} 

//api call to create a video game with gin context middleware, also utilizing JSON methods

func createVideoGame(c *gin.Context) {
	var newVideoGame videoGame

	if err := c.BindJSON(&newVideoGame); err != nil {
		return
	}

	videoGames = append(videoGames, newVideoGame)
	//Upate ranks after adding new game
	updateRanks()
	c.IndentedJSON(http.StatusCreated, newVideoGame)
}

func updateRanks() {
	//Sort video games by rank
	sort.Slice(videoGames, func(i, j int) bool {
		return videoGames[i].Rank < videoGames[j].Rank
	})
	//Update rank sequentially
	for i := range videoGames {
		videoGames[i].Rank = i + 1
	}
}

func rankVideoGame(c *gin.Context) {
	id := c.Query("id")
	rank, _ := strconv.Atoi(c.Query("rank"))

	for i := range videoGames {
		if videoGames[i].ID == id {
			videoGames[i].Rank = rank
			break
		}
	}
	updateRanks()
	c.Status(http.StatusOK)
}

//create routers with the help of gin package
func main() {
	router := gin.Default()
	// CORS middleware
    config := cors.DefaultConfig()
    config.AllowOrigins = []string{"http://localhost:5173"}
    router.Use(cors.New(config))
	router.GET("/videoGames", getVideoGames)
	router.GET("/videoGames/:id", videoGameById)
	router.POST("/videoGames", createVideoGame)
	router.PATCH("/rank", rankVideoGame)
	router.Run("localhost:8080")
}