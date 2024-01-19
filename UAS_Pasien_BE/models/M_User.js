
import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const M_User = sequelize.define("users", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});


(async () => {
    try {
        await M_User.sync();
        console.log("Tabel Berhasil Dibuat");
    } catch (error) {
        console.error("Tidak Dapat Membuat Tabel:", error);
    }})();

export default M_User;