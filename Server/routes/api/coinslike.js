const express = require("express");
const router = express.Router();
const CoinsLike = require("../../models/CoinsLike.js");

// check if the user has liked the movie
router.get("/isLiked/:coinId", async (req, res) => {
  const coinId = req.params.coinId;

  if (!req.session.user) {
    return res.status(403).send({ response: "you need to log in" });
  }

  if (coinId) {
    try {
    const likedMovie = await CoinsLike.query()
      .where({
        movie_id: coinId,
        user_id: req.session.user.id
      })
      .limit(1);

      if (!likedMovie[0]) {
        return res.status(404).send({ response: "Not liked" });
      } else {
        return res.json({ response: "Liked", id: likedMovie[0].id });
      }
    } catch(error) {
        return res
        .status(500)
        .send({ response: "Something went wrong with the database" });
    }
  } else {
    return res.status(404).send({ response: "No coin id" });
  }
});

// get all liked movies from a user
router.get("/", async (req, res) => {
  if (!req.session.user) {
    return res.status(403).send({ response: "you need to log in" });
  }
  
  try {
    const userLikedList = await CoinsLike.query().where({
      user_id: req.session.user.id
    });
    return res.json(userLikedList);
  } catch (error) {
      return res
        .status(500)
        .send({ response: "Something went wrong with the database" });
  }
});

// post new like
router.post("/", async (req, res) => {
  const { movie_id } = req.body;

  if (!req.session.user) {
    return res.status(403).send({ response: "you need to log in" });
  }

  if (movie_id) {
    try {
      const isCoinsLiked = await CoinsLike.query()
        .where({
          movie_id: movie_id,
          user_id: req.session.user.id,
        })
        .limit(1);
      if (!isCoinsLiked[0]) {
        const newLike = await CoinsLike.query().insert({
          movie_id,
          user_id: req.session.user.id,
        });
        return res.json(newLike);
      } else {
        return res
          .status(400)
          .send({ response: "You already like this coin" });
      }
    } catch (error) {
      return res
        .status(500)
        .send({ response: "something went wrong in the database" });
    }
  } else {
    return res.status(400).send({ response: "No id provided" });
  }
});

// Unlike a movie
router.delete("/:id", async (req, res) => {
  const likeId = req.params.id;

  if (!req.session.user) {
    return res.status(403).send({ response: "you need to log in" });
  }
  
  if (likeId) {
    try {
      await CoinsLike.query().deleteById(likeId);
      return res.send({ response: "successfully unliked coin" });
    } catch (error) {
      return res.status(500).send({ response: "could not unlike coin" });
    }
  } else {
    return res.status(404).send({ response: "No id provided" });
  }
});

module.exports = router;
