import express, { Request, Response } from "express";

const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 4000;

require("dotenv").config();
const { API_KEY } = process.env;

app.use(cors(["http://localhost:3000", "https://seoul-air.vercel.app/"]));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let list: { date: string; time: string; name: string } = {
  date: "",
  time: "",
  name: "",
};

app.get("/", (req, res) => {
  res.json("hello world");
});

app.get("/data", async (req, res) => {
  console.log(list);
  const getAPI = async (req: Request) => {
    const API_URL = `http://openAPI.seoul.go.kr:8088/${API_KEY}/json/TimeAverageAirQuality/1/25/${list.date}/${list.name}`;
    let response;
    try {
      response = await axios.get(API_URL);
    } catch (error) {
      console.log(error);
    }
    return response;
  };
  await getAPI(req).then((response) => {
    res.json(response.data);
  });
});

app.post("/data", async (req, res) => {
  list = {
    date: req.body.date,
    time: req.body.time,
    name: req.body.name,
  };
  res.send(list);
});

app.listen(port, () => console.log("running"));
