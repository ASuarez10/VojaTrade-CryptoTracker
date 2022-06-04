const { Model } = require("objection");
const User = require("./User.js");

class CoinsList extends Model {
  static get tableName() {
    return "coinsList";
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "CoinsList.user_id",
          to: "users.id",
        },
      },
    };
  }
}

module.exports = CoinsList;
