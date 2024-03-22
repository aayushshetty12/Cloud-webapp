import { Sequelize, DataTypes } from 'sequelize';
import {sequelize} from "../services/database-service.js" 
import bcrypt from 'bcrypt'

const User = sequelize.define('User', {
  // Model attributes are defined here
  uuid:{
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    readOnly: true,
    primaryKey: true
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    // writeOnly: true,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  account_created: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    readOnly: true,
    allowNull: false
  },
  account_updated: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    readOnly: true,
    allowNull: false
  }
}, {
  createdAt: 'account_created',
  updatedAt: 'account_updated',
  hooks: {
    beforeCreate: async (user) => {

      const salt = 10;
      const hashedPassword = await bcrypt.hash(user.password, salt);
      user.password = hashedPassword;

    },
    beforeUpdate: async (user) => {
      // Ignore any provided value for account_updated and update with the current timestamp
      const salt = 10;
      const hashedPassword = await bcrypt.hash(user.password, salt);
      user.password = hashedPassword;
    },
  }
});


User.sync()
  .then(() => {
    console.log('User table created successfully.');
  })
  .catch((error) => {
    console.error('Error creating User table:', error);
  });

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true


export default User 