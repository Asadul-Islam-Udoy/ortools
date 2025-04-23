import { Link } from "react-router-dom"
import AppsIcon from '@mui/icons-material/Apps';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
function AdminSidebar() {
    return (
         <>
         <div className="bg-white mt-20 absolute  md:w-[20%] w-[22%] h-screen">
           <div>
             <div className="bg-orange-400 md:flex  items-center p-1 md:p-4 text-center">
              <Link className="md:flex  items-center" to='/'>
              <AppsIcon style={{fontSize:'30px',marginTop:'3px',color:'red'}}/>
               <h1 className="text-white font-bold italic text-[14px] md:text-[23px]">DASHBOARD</h1>
               </Link> 
             </div>
             <div className="p-3 hover:bg-gray-100 font-bold  border ">
               <Link className="text-gray-600 flex md:text-[17px]  md:mr-2 mr-4 text-[14px] items-center" to='/dashboard/customers'> <SupervisorAccountIcon/> Customers</Link>
             </div>
             <div className="p-3 hover:bg-gray-100 font-bold  border ">
             <Link className="text-gray-600 flex items-center" to='/dashboard/upload/csv_file'> <UploadFileIcon/>Upload Csv File</Link>  
             </div>
            
           </div>
         </div>
         </>
     
    )
}

export default AdminSidebar
