// ../config/db.js
// config/db.js
// config/db.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  database: 'nama_database',
  username: 'nama_pengguna',
  password: 'kata_sandi',
  host: '127.0.0.1',
  dialect: 'mysql',
});

export default sequelize;


// sequelize.sync({ force: true }).then(() => {
//   console.log('Tabel berhasil dibuat!');
// }).catch((error) => {
//   console.error('Gagal membuat tabel:', error);
// });
