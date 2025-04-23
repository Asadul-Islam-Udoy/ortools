import { useState,useContext,createContext, useEffect ,ReactNode} from "react";

const AuthContext = createContext<any>(null);
interface AuthProviderProps{
    children:ReactNode
}
 const AuthProvider =({ children }:AuthProviderProps)=>{
    const [auth,setAuth] = useState<{user:any,token:string}|null>(null)
    const [loading,setLodding] = useState<boolean>(true);
    useEffect(()=>{
        setLodding(true);
        const data = localStorage.getItem('auth');
        if(data){
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                user:parseData.user,
                token:parseData.token
            })
        }
        setLodding(false);
    }, [])

    if(loading){
        return <div>Lodding..</div>
    }
    return(
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}
const useAuth = () =>useContext(AuthContext);
export  { useAuth, AuthProvider };

