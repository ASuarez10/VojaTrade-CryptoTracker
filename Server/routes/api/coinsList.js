const express = require("express");
const router = express.Router();
const CoinsList = require("../../models/CoinsList.js");

// check if user has watchlisted movie
router.get("/hasCoinsList/:coinId", async (req, res) => {
  const coinId = req.params.coinId;

  if (!req.session.user) {
    return res.status(403).send({ response: "you need to log in" });
  }

  if (coinId) {
    try {
      const coinsListCoin = await CoinsList.query()
        .where({
          coin_id: coinId,
          user_id: req.session.user.id,
        })
        .limit(1);

      if (!coinsListCoin[0]) {
        return res.status(404).send({ response: "This coin is not in the list" });
      } else {
        return res.json({ response: "Coin found", id: coinsListCoin[0].id });
      }
    } catch (error) {
      return res
        .status(500)
        .send({ response: "Something went wrong with the database" });
    }
  }
});

// get all Coins in coinlist of session user
router.get("/", async (req, res) => {
  if (!req.session.user) {
    return res.status(403).send({ response: "you need to log in" });
  }
  
  try {
    const userCoinsList = await CoinsList.query().where({
      user_id: req.session.user.id
    })
    return res.json(userCoinsList);
  } catch (error) {
    return res
      .status(500)
      .send({ response: "Something went wrong with the database" });
  }
});

// add new coin to CoinsList
router.post("/", async (req, res) => {
  const { coin_id } = req.body;

  if (!req.session.user) {
    return res.status(403).send({ response: "you need to log in" });
  }

  if (coin_id) {
    try {
      const existingCoinsList = await CoinsList.query()
        .where({
          coin_id: coin_id,
          user_id: req.session.user.id,
        })
        .limit(1);
      if (!existingCoinsList[0]) {
        const newCoinsList = await CoinsList.query().insert({
          user_id: req.session.user.id,
          coin_id: coin_id,
        });
        return res.json(newCoinsList);
      } else {
        return res
          .status(404)
          .send({ response: "You already have the coin list" });
      }
    } catch (error) {
      return res.status(500).send({
        response: "Something went wrong with the database"
      });
    }
  } else {
    return res.status(404).send({ response: "No coin id provided" });
  }
});

// remove movie from watchlist
router.delete("/:id", async (req, res) => {
  coinsListId = req.params.id;

  if (!req.session.user) {
    return res.status(403).send({ response: "you need to log in" });
  }

  if (coinsListId) {
    try {
      await CoinsList.query().deleteById(coinsListId);
      return res.status(200).send({ response: "successfully deleted" });
    } catch (error) {
      return res.status(500).send({ response: "could not delete coinsList" });
    }
  } else {
    return res.status(404).send({ response: "no id provided" });
  }
});


module.exports = router;
