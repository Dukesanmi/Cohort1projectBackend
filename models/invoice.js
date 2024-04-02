import { v4 as uuidv4 } from "uuid";

export const InvoiceModel = (sequelize, DataTypes) => {
  const Invoice = sequelize.define(
    "Invoice",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(), // Generate UUID by default
        primaryKey: true,
      },
      recipient: {
        type: DataTypes.STRING,
        references: {
          model: "InvoiceRecipient",
          key: "id"
        }
      },
      issue_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      due_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      total_price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("Due", "Pending", "Processing"),
        allowNull: false,
      }
    },
    {
      tableName: "Invoice",
    }
  );
  return Invoice;
};
