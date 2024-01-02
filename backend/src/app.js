const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./config/database');


const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require('path')
const cors = require('cors')


// const corsOrigin = {
//     origin: 'http://localhost:5173', //or whatever port your frontend is using
//     credentials: true,
//     optionSuccessStatus: 200
// }
// app.use(cors(corsOrigin));


const port = process.env.PORT || 5000;
connectDB();


//routes
const user = require('./routes/userRoute');
app.use(cors({
    origin: ["*"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));




app.use("/api/v1", user)
app.use(express.static(path.join(__dirname, "frontend\index.html")));

app.listen(port, () => {
    console.log(`App listeing on port ${port}`)
});