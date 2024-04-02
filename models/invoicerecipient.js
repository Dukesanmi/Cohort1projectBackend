import { v4 as uuidv4 } from "uuid";

export const InvoiceRecipientModel = (sequelize, DataTypes) => {
  const InvoiceRecipient = sequelize.define(
    "InvoiceRecipient",
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
      recipient_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      recipient_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      recipient_billing_address: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      tableName: "InvoiceRecipient",
    }
  );
  return InvoiceRecipient;
};
