import { v4 as uuidv4 } from "uuid";

export const InvoiceItemsModel = (sequelize, DataTypes) => {
  const InvoiceItems = sequelize.define(
    "InvoiceItems",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(), // Generate UUID by default
        primaryKey: true,
      },
      invoice: {
        type: DataTypes.STRING,
        references: {
          model: "Invoice",
          key: "id"
        }
      },
      item_description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      unit_price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      vat: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      }
    },
    {
      tableName: "InvoiceItems",
    }
  );
  return InvoiceItems;
};
