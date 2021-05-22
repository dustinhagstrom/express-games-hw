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

module.exports = router;
