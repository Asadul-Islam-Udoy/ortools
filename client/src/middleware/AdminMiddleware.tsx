import React, { JSX } from 'react'
import { Navigate } from 'react-router-dom'
interface AuthProps{
    isAdmin:boolean,
    children:JSX.Element
}
function AdminMiddleware({isAdmin,children}:AuthProps) {
   if(!isAdmin){
    return <Navigate to='/login' replace/>
   }
   return <>{children}</>
}

export default AdminMiddleware