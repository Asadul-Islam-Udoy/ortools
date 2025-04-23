import User from '../models/UserModel'
import bcrypt from "bcrypt";
const AdminSeeder = async () => {
    try {
      const findAdmin = await User.findAll();
      if(findAdmin?.length <= 0){
        await User.create({
          username:'AsAdUL kHAan',
          email:'admin@gmail.com',
          password: await bcrypt.hash('123', 10),
          role:'admin'
        });
        console.log("Admin Seeder data already exists, skipping seed.");
      }
   
    } catch (error:any) {
      console.error("Error seeding slider data:", error.message);
    }
  };
  
 export default  AdminSeeder;