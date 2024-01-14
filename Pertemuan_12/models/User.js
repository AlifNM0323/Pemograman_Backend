import sequelize from "../config/Student.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("User", {
username: { 
    type: DataTypes.STRING,
    allowNull: false,
},
email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
},
password: { 
    type: DataTypes.STRING,
    allowNull: false,
},

});

try{
    await User.stnc();
    console.log("The user table was created");

} catch (error){
    console.error("Cannot create table: ", error);
}

export default User;