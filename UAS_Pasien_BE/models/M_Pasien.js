

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import M_Status from './M_Status.js';


const M_Pasien = sequelize.define('patients', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.INTEGER, 
        allowNull: false,
    },

    address: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    in_date_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    out_date_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    timestamp: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    statusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: M_Status,
            key: 'id',
        },
    },
});
M_Pasien.belongsTo(M_Status, { foreignKey: 'statusId' });
M_Status.hasMany(M_Pasien, { foreignKey: 'statusId' });


export default M_Pasien;