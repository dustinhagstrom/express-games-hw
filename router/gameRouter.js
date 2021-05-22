const express = require("express");
const router = express.Router();
const uuidv4 = require("uuid").v4;

let games = [
  {
    id: "adowb1b3bb",
    game: "League of Legends",
    description:
      "League of Legends is a team-based game with over 140 champions to make epic plays with.",
  },
  {
    id: "kd7b9ks2nda",
    game: "PlayerUnknown's Battlegrounds",
    description:
      "PLAYERUNKNOWN'S BATTLEGROUNDS is a last-man-standing shooter being developed with community feedback.",
  },
];

router.get("/get-all-games", function (req, res) {
  res.json({ payload: games });
});

router.get("/get-game-by-id/:id", function (req, res) {
  games.forEach((item) => {
    if (item.id === req.params.id) {
      res.json({ payload: item });
    }
  });
  res.json({ message: "The game with the id does not exist, please check id" });
});

////////////////////////////////////////////////
///////////////////Extra Credit/////////////////
//////////////////////Below/////////////////////
////////////////////////////////////////////////
router.get("/get-game-by-name/:name", function (req, res) {
  let foundGame = games.findIndex(function (games) {
    return (
      games.game.replaceAll(" ", "").toLowerCase() ===
      req.params.name.toLowerCase()
    );
  });

  if (foundGame === -1) {
    res.json({ message: "The game does not exist, please check name" });
  } else {
    res.json({
      payload: games[foundGame],
    });
  }
});
////////////////////////////////////////////////
///////////////////Extra Credit/////////////////
//////////////////////Above/////////////////////
////////////////////////////////////////////////

router.post("/create-new-game", function (req, res) {
  let newGameObj = {
    id: uuidv4(),
    game: req.body.game,
    description: req.body.description,
  };
  let gameIndex = games.findIndex((games) => games.game === newGameObj.game);

  if (req.body.game === undefined || req.body.description === undefined) {
    res.json({ message: "cannot leave text area blank" });
  } else if (gameIndex > -1) {
    res.json({ message: "Game already exists, cannot add game" });
  }

  games.push(newGameObj);
  res.json({ payload: games });
});

router.put("/update-game/:id", function (req, res) {
  let gameIndex = games.findIndex((games) => games.id === req.params.id);
  if (gameIndex === -1) {
    res.json({ message: "game not found, cannot update" });
  } else {
    if (req.body.description === undefined && req.body.game === undefined) {
      res.json({
        message:
          "We can't update the game because you didn't give us any information with which we could update!!!",
      });
    }
    if (req.body.description !== undefined) {
      games[gameIndex].description = req.body.description;
    }
    if (req.body.game !== undefined) {
      games[gameIndex].game = req.body.game;
    }
    res.json({ message: "The game has been updated!" });
  }
});

router.delete("/delete-game/:id", function (req, res) {
  let foundTheGame = games.findIndex((games) => games.id === req.params.id);
  if (foundTheGame === -1) {
    res.json({ message: "game not found, cannot delete" });
  } else {
    games.splice(foundTheGame, 1);
    res.json({ payload: games });
  }
});

module.exports = router;
