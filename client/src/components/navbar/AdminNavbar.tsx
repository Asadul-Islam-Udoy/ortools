import AddAlertIcon from "@mui/icons-material/AddAlert";
import SearchIcon from "@mui/icons-material/Search";
import { useAuth } from "../../context/UserContext";
function AdminNavbar() {
  const [auth] = useAuth();
  console.log(auth?.user?.username)
  return (
    <div className="bg-white flex  justify-between py-2 shadow-lg">
      <div className="md:ml-9">
        <img
          alt="nusaiba-construction"
          loading="lazy"
          decoding="async"
          data-nimg="1"
          src="https://orangetoolz.sgp1.cdn.digitaloceanspaces.com/orangetoolz-media/2023/10/06054521/Logo.svg"
          className=" m-3 h-[45px] md:w-[160px] w-[120px]"
        />
      </div>
      <div className="flex justify-center items-center gap-6 mr-6">
        <div className="p-2">
          <div className="relative flex w-full">
            <input
              type="text"
              placeholder="Search"
              className="py-2 md:w-[500px] bg-gray-200 focus:outline-none pl-2 rounded-lg"
            />
            <div className="absolute right-3 cursor-pointer text-gray-400   mt-2">
              <SearchIcon />
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="text-[#88a3d2] relative cursor-pointer mt-2">
            <div className="absolute bg-orange-700 text-white rounded-full flex items-center justify-center text-center h-3 w-3  translate-x-[13px] translate-y-[-2px] text-[9px]">
              12
            </div>
            <div>
              {" "}
              <AddAlertIcon />
            </div>
          </div>
          <span className=" text-gray-600 font-bold">
            {auth?.user ? auth?.user?.username : 'Asadul Islam'}
            <br />
            <span className="font-normal">Admin</span>
          </span>
          <img className="w-[30px] h-[30px] rounded-full" src="/29937.jpg" />
        </div>
      </div>
    </div>
  );
}

export default AdminNavbar;
