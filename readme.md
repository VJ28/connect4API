Request:

    /START/ - Creates a new game and returns the gameId
        response:
            {
                "status": "READY",
                "gameId": "5f706372726d443704af3386"
            }

    /game/gameId/move/ - Adds the move - Yellow plays the first move
        params: gameId is the id which is returned when a game is initialised on START request and move is number of range 0-6

        response: 
            {
                "isWinner":true,
                "msg":"Yellow wins",
                "matrix":[[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[1,2,0,0,0,0],[1,2,0,0,0,0],[1,2,0,0,0,0],[1,0,0,0,0,0]],
                "next":"Game Over"
            }