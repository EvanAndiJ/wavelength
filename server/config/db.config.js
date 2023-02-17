module.exports = 
// process.env.NODE_ENV === 'production' 
// ? {
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     db: process.env.DB_NAME,
//     dialect: "postgres",
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     }
//   }
// : 
{ 
  host: 'localhost',
  user: 'postgres',
  password: 'jones',
  db: 'wavelength',
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}