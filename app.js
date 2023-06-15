require("dotenv").config();
const express =  require("express")
const cors = require("cors");
const morgan = require("morgan")
const bodyParser = require("body-parser");
const connect_db = require("./config/connectdb");
const userRoute = require("./routes/userRoutes")

PORT = process.env.PORT
const app = express();

//cors policy
app.use(cors());
app.use(morgan("dev"));

//json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//routes
app.use("/api/user",userRoute);


app.listen(PORT,async()=>{
    try {
        await connect_db;
        console.log(`listening on http://localhost:${PORT} `);
    } catch (error) {
        console.error(error)
    }
})