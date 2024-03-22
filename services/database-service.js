import { Sequelize } from 'sequelize';
import dotenv from "dotenv"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({
  override: true,
  path: path.join(__dirname,'../.env')
})

export const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql',
    logging: false
  });
  
export const authenticate = () => {
    return sequelize.authenticate()
}