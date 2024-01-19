import { Sequelize } from "sequelize";
import "dotenv/config";



const sequelize = new Sequelize({
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: console.log,
});

const testDatabaseConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database Koneksi");
    } catch (error) {
        console.error("Tidak dapat terhubung ke database:", error);
    }
};

testDatabaseConnection();

export default sequelize;