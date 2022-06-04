const { Model } = require("objection");
const User = require("./User.js");
class CoinsLike extends Model {
  static get tableName() {
    return "coinslike";
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "coinslike.user_id",
          to: "users.id",
        },
      },
    };
  }
}

module.exports = CoinsLike;
