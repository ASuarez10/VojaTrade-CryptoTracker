exports.up = function (knex) {
    return knex.schema
      .createTable("users", (table) => {
        table.increments("id");
        table.string("username");
        table.string("email").notNullable();
        table.string("password").notNullable();
  
      })
      .createTable("coinslist", (table) => {
        table.increments("id");
        table.integer("user_id").unsigned().notNullable();
        table.integer("coin_id").unsigned().notNullable();
        
        table
          .foreign("user_id")
          .references("id")
          .inTable("users")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
      })
      
      .createTable("coinlike", (table) => {
        table.increments("id");
        table.integer("user_id").unsigned().notNullable();
        table.integer("coin_id").unsigned().notNullable();
  
        table
          .foreign("user_id")
          .references("id")
          .inTable("users")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
      });
  };
  
  exports.down = function (knex) {
    return (
      knex.schema
        .dropTableIfExists("coinLike")
        .dropTableIfExists("coinslist")
        .dropTableIfExists("users")
    );
  };
  