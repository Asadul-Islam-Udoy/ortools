
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

function Customer() {
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

      <div className="bg-gray-200 overflow-hidden  w-[80%] flex flex-col  items-center gap-4 ml-[20%] min-h-screen">
        <div className="flex w-[90%] mt-28 justify-between">
          <h3 className="  font-bold text-orange-400 italic text-[22px]  md:text-[30px]">
            Customer Management Page
          </h3>
          <div className="mr-5 flex gap-7">

            <div
              title="add customer"
              onClick={() => setIsOpen((pre) => !pre)}
              className="border border-2 cursor-pointer rounded-sm text-[#88a3d2] flex justify-center items-center border-[#88a3d2] w-10 h-10"
            >
              <AddIcon />
            </div>
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

        <div className="bg-white w-[90%] min-h-[300px]">
          <div className="flex mt-7 ">
            <div className="relative flex mt-2 mr-3 justify-end w-full">
              <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                type="text"
                placeholder="Search"
                className="py-2 md:w-[300px] border border-2 focus:outline-none pl-2 rounded-lg"
              />
              <div className="absolute cursor-pointer right-3 cursor-pointer text-gray-400   mt-2">
                <SearchIcon />
              </div>
            </div>
            <div onClick={()=>window.location.reload()} className="border cursor-pointer rounded-sm border-2 text-[#88a3d2] flex justify-center items-center border-[#88a3d2] w-10 h-10 mt-2 mr-3">
              <LoopIcon />
            </div>
          </div>
          <div className="m-3 ">
            {isUpdate && (
              <CustomerUpdateModal
                isUpdate={isUpdate}
                setIsUpdate={setIsUpdate}
                userid={id}
              />
            )}
            {isOpen && (
              <CustomerCreateModal isOpen={isOpen} setIsOpen={setIsOpen} />
            )}
            {isDelete && (
              <CustomerDeleteModal
                isDelete={isDelete}
                setIsDelete={setIsDelete}
                userid={id}
              />
            )}
            {!isOpen && !isUpdate && !isDelete && (
              <CustomersTable setIsUpdate={setIsUpdate}  setIsDelete={setIsDelete} setId={setId} searchValue={searchValue} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customer;
