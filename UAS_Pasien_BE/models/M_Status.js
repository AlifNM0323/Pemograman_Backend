import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const M_Status = sequelize.define('status', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true,
    },
    status: {
        type: DataTypes.ENUM('sembuh', 'meninggal', 'positif'),
        allowNull: false,
    },
});

export default M_Status;
