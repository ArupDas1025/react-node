const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("authDB", "postgres", "postgres", {
  host: "127.0.0.1",
  dialect: "postgres",
});

const User = sequelize.define(
  "user",
  {
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false, defaultValue: "user" }, // Default role as 'user'
  },
  {
    tableName: "user", // ✅ Explicitly define table name as 'user'
    freezeTableName: true, // ✅ Prevent Sequelize from pluralizing table names
    timestamps: true,
  }
);

module.exports = User;
