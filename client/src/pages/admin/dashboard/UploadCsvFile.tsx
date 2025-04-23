
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import {  useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import AdminNavbar from "../../../components/navbar/AdminNavbar";
import AdminSidebar from "../../../components/sidbar/AdminSidebar";
import HostUrls from "../../../host/HostUrls";


function UploadCsvFile() {
  const navigate = useNavigate();
  const [loading, setLodding] = useState<boolean>(false);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [summary, setSummary] = useState<any>(null);

  const handleFileChange = (e:any) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    setLodding(true);
    try {
      const response = await axios.post(HostUrls+'/api/customers/upload/csv_file', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        
        onUploadProgress: (event:any) => {
          if (event.total) {
            setProgress(Math.round((event.loaded / event.total) * 100));
          }
        },
        withCredentials: true,
      });

      setSummary(response.data.summary);
      setLodding(false);
    } catch (error) {
      setLodding(false);
      console.error('Error uploading CSV:', error);
    }
  };
  const logoutHandler = async () => {
    setLodding(true);
    const config = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(HostUrls + "/api/users/logout/", config);
    const data = await response.json();
    if (!response.ok) {
      toast.error(data.message);
      setLodding(false);
    } else {
      toast.success("logout successfully!");
      localStorage.removeItem("auth");
      setLodding(false);
      navigate("/login");
    }
  };

  return (
    <div className="">
      <div className="w-full">
        <AdminSidebar />
      </div>
      <div className="fixed h-10 z-3 w-full">
        <AdminNavbar />
      </div>

      <div className="bg-gray-200 overflow-hidden  w-[80%] flex flex-col  items-center gap-4 ml-[20%] min-h-screen">
        <div className="flex w-[90%] mt-28 justify-between">
          <h3 className="  font-bold text-orange-400 italic text-[22px]  md:text-[30px]">
            Customer Csv File Upload Page
          </h3>
          <div className="mr-5 flex gap-7">
            <div
              onClick={logoutHandler}
              title="logout"
              className="border border-2 cursor-pointer rounded-sm text-[#88a3d2] flex justify-center items-center border-[#88a3d2] w-10 h-10"
            >
              <LogoutIcon />
              {loading && "..."}
            </div>
          </div>
        </div>

        <div className="bg-white w-[90%] min-h-[450px]">
        <div>
        <div className="flex p-2 flex-col w-[90%] gap-1 md:w-[70%] ml-5">
      <input  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" type="file" accept=".csv" onChange={handleFileChange} />
     </div>
      <div className="flex p-2 flex-col w-[90%] gap-1 md:w-[70%] ml-5">
      <button  className="bg-[tomato] rounded-lg text-white py-2" onClick={handleUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload CSV'}
      </button>
      </div>
      {progress > 0 && <div className="m-3">Upload Progress: {progress}%</div>}

      {summary && (
        <div className="m-3">
          <h3>Summary</h3>
          <ul>
            <li>Processed: {summary?.processed}</li>
            <li>Inserted: {summary?.inserted}</li>
            <li>Failed: {summary?.failed}</li>
            <li>Skipped: {summary?.skipped}</li>
          </ul>
        </div>
      )}
    </div>
        </div>
      </div>
    </div>
  );
}

export default UploadCsvFile;
