import  express  from "express"
import routes from "./routes/api.js"
const app = express();

app.use(routes)
app.use(express.urlencoded())
app.use(express.json())



const port = 3000
app.listen(3000,()=>{
    console.log("Server Berjalan di http://localhost:"+port)
})
