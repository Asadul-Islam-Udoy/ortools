import { Link, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import HostUrls from "../../../host/HostUrls";
import { useAuth } from "../../../context/UserContext";
function LoginPage() {
  const [auth, setAuth] = useAuth();
  interface User {
    email: string;
    password: string;
  }
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [lodding, setLodding] = useState<boolean>(false);
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });
  const SumbitHanler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLodding(true);
      const config: any = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
        credentials: "include",
      };
      const response = await fetch(HostUrls + "/api/users/login/", config);
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message);
        setLodding(false);
      } else {
        setAuth(data);
        localStorage.setItem("auth", JSON.stringify(data));
        setLodding(false);
        navigate("/");
      }
    } catch (error: any) {
      console.log(error);
      //toast.error(error.response.data.message)
    } finally {
      setLodding(false);
    }
  };

  ////google login

  return (
    <div className="flex bg-gray-50 h-screen justify-center w-full items-center">
      <div className="flex grid grid-cols-1 bg-gradient-to-r justify-around rounded-sm shadow-lg w-[98%] from-orange-400 via-orange-300 to-orange-200 gap-4 items-center md:grid-cols-2 md:h-[68%] md:w-[55%]">
        <div className="flex flex-col justify-center gap-4 items-center">
          <div>
            <img
              alt="nusaiba-construction"
              loading="lazy"
              decoding="async"
              data-nimg="1"
              src="https://orangetoolz.sgp1.cdn.digitaloceanspaces.com/orangetoolz-media/2023/10/06054521/Logo.svg"
              className="w-[150px] md:w-[300px]"
            />
          </div>
          <div className="flex justify-center w-[90%] item-center">
            <p className="text-center text-gray-700 w-full md:text-[20px]">
            Transform your ideas  into great real-world solution
            </p>
          </div>
        </div>
        <form onSubmit={SumbitHanler}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col w-[90%] gap-1 md:w-[70%] ml-5">
              <label className="text-gray-600">Email</label>
              <input
                type="email"
                required
                value={user.email}
                onChange={(e) =>
                  setUser((pre) => ({ ...pre, email: e.target.value }))
                }
                className="rounded-lg focus:outline-none pl-2 py-3"
              />
            </div>
            <div className="flex flex-col w-[90%] gap-1 md:w-[70%] ml-5">
              <label className="text-gray-600">Password</label>
              <div className="flex w-full relative">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  value={user.password}
                  onChange={(e) =>
                    setUser((pre) => ({ ...pre, password: e.target.value }))
                  }
                  className="rounded-lg w-full focus:outline-none pl-2 py-3"
                />
                <div
                  onClick={() => setShowPassword((pre) => !pre)}
                  className="text-gray-400 absolute cursor-pointer mt-2 right-3"
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </div>
              </div>
            </div>
            <div className="flex justify-between w-[90%] gap-1 md:w-[70%] ml-5">
              <div className="flex gap-1">
                <input className="w-4" type="radio" />
                <p className="italic">Remember me</p>
              </div>
              <Link className="text-blue-500" to="/forget-password">
                Forget Password?
              </Link>
            </div>
            <div className="flex flex-col w-[90%] gap-1 md:w-[70%] ml-5">
              <button
                type="submit"
                className="bg-[tomato] rounded-lg text-white py-2"
              >
                {lodding ? "Login..." : "Login"}
              </button>
            </div>
            <span className="flex justify-center w-[100%] md:w-[80%]">or</span>
            <div className="flex flex-col w-[90%] gap-1 md:w-[70%] ml-5">
              <Link
                className="flex flex-col w-[100%] gap-1"
                to={HostUrls + "/api/users/google"}
              >
                <p className="flex border-slate-200 rounded-lg text-slate-700 dark:border-slate-700 dark:hover:border-slate-500 dark:hover:text-slate-300 dark:text-slate-200 duration-150 gap-2 hover:border-slate-400 hover:shadow hover:text-slate-900 px-4 py-2 transition">
                  <img
                    className="h-6 w-6"
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    loading="lazy"
                    alt="google logo"
                  />
                  <span>Login with Google</span>
                </p>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
