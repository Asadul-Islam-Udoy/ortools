import app from './app';
import { DbConnection } from './config/DbConnerction';
//datatase connection
DbConnection()
///server connection
const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log(`server running http://localhost:${PORT}`)
})