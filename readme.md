Can test the api on https://connect4apigame.herokuapp.com/

Request:

    https://connect4apigame.herokuapp.com/START/ - Creates a new game and returns the gameId
        response:
            {
                "status": "READY",
                "gameId": "5f706372726d443704af3386"
            }

    https://connect4apigame.herokuapp.com/game/gameId/column/ - Adds the move - Yellow plays the first move

    eg request - https://connect4apigame.herokuapp.com/game/5f706c84c0d2b90017fa3724/4

        params: gameId is the id which is returned when a game is initialised on START request and move is number of range 0-6

        response: 
            {
                "isWinner":true,
                "msg":"Yellow wins",
                "matrix":[[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[1,2,0,0,0,0],[1,2,0,0,0,0],[1,2,0,0,0,0],[1,0,0,0,0,0]],
                "next":"Game Over"
            }