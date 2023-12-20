import  express  from "express"
import routes from "./routes/api.js"
const app = express();

app.use(express.json())
app.use(express.urlencoded())

app.use(routes)

const port = 3000
app.listen(3000,()=>{
    console.log("Server Berjalan di http://localhost:"+port)
})