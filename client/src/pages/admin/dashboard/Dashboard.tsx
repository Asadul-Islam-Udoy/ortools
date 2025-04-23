
import LoopIcon from "@mui/icons-material/Loop";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import {  useState } from "react";

import { toast } from "react-toastify";
import AdminNavbar from "../../../components/navbar/AdminNavbar";
import AdminSidebar from "../../../components/sidbar/AdminSidebar";
import HostUrls from "../../../host/HostUrls";
import CustomersTable from "../../../components/dashboard/CustomersTable";
import CustomerCreateModal from "../../../modal/CustomerCreateModal";
import CustomerUpdateModal from "../../../modal/CustomerUpdateModal";
import CustomerDeleteModal from "../../../modal/CustomerDeleteModal";

function Dashboard() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>("");
  const [loading, setLodding] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
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

      <div className="bg-gray-200  overflow-hidden  w-[80%] flex flex-col  items-center gap-4 ml-[20%] min-h-screen">
      <div className="flex w-[90%] border-b-2 border-orange-300 border-b  pb-2 mt-28 justify-between">
          <h3 className="   font-bold text-orange-400 italic text-[22px]  md:text-[30px]">
            Orangetoolz Dashboard Home Page
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
        <div className="flex w-[90%] mt-28 justify-between">
          {/* <h3 className="  font-bold text-orange-400 italic text-[22px]  md:text-[30px]">
            Customer Management Page
          </h3> */}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
