import db from "../config/db.js";
import { DataTypes } from "sequelize";

const Student = db.define("students",{
    nama : {
        type: DataTypes.STRING,
        allowNull: false
    },
    nim : {
        type: DataTypes.STRING,
        allowNull: false
    },
    email : {
        type: DataTypes.STRING,
        allowNull: false
    },
    jurusan : {
        type: DataTypes.STRING,
        allowNull: false
    }
})

try {
    await db.sync();
    console.log("The table student was Created")
} catch (error) {
    console.error("Cannot Create Table: "+error)
}

export default Student