import AdminSeeder from "../seeder/AdminSeader";

const { Sequelize } = require('sequelize');
require('dotenv').config({path:'.env'});

const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export const DbConnection = async()=>{
  try{
   await sequelize.authenticate();
   console.log('Database Connection Successfully!');
   await sequelize.sync({ force: false });
   AdminSeeder()
  }
  catch(err:any){
    console.error('Database sync error:', err);
  }
} 
export default sequelize ;