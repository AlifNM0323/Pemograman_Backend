import express from "express";

import apiRouting from "../routes/api.js";

const app = express();

app.use("/", apiRouting);

app.listen(8000, function (){
    // console.log(Server berjalan di http://localhost:8000 );
});