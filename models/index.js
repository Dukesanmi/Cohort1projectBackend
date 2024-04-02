import { databaseConfig } from "../config/database.js";
import { Sequelize, DataTypes } from "sequelize";
import { UserModel } from "./user.js";
import VirtualCardModel from "./vcard.js";
import InvoiceModel from "./invoice.js";
import InvoiceRecipientModel from "./invoicerecipient.js";
import InvoiceItemsModel from "./invoiceitems.js";

// Create a Sequelize instance with the database configurations
const sequelize = new Sequelize(
  databaseConfig.DB,
  databaseConfig.USER,
  databaseConfig.PASSWORD,
  {
    host: databaseConfig.HOST,
    dialect: databaseConfig.dialect,
    pool: {
      max: databaseConfig.pool.max,
      min: databaseConfig.pool.min,
      acquire: databaseConfig.pool.acquire,
      idle: databaseConfig.pool.idle,
    },
  }
);

export async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connected to the mysql database.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

const User = UserModel(sequelize, DataTypes);
const VirtualCard = VirtualCardModel(sequelize, DataTypes);
const Invoice = InvoiceModel(sequelize, DataTypes);
const InvoiceRecipient = InvoiceRecipientModel(sequelize, DataTypes);
const InvoiceItems = InvoiceItemsModel(sequelize, DataTypes);

// db relationships
User.hasMany(VirtualCard)
InvoiceRecipient.hasMany(Invoice)
Invoice.hasMany(InvoiceItems)


// Add our models
db.users = User
db.VirtualCard = VirtualCard
db.Invoice = Invoice
db.InvoiceRecipient = InvoiceRecipient
db.InvoiceItems = InvoiceItems


db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Table sync successfully");
  })
  .catch((err) => {
    console.log("Error occured while syncing the table", err);
  });

export default db;
