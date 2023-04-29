import express, { Request, Response } from "express";

const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 4000;

require("dotenv").config();
const { API_KEY } = process.env;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const day = date.getDate();

const today = new Date(year, month, day).toLocaleDateString();
const yesterday = new Date(year, month, day - 1).toLocaleDateString();

let list: { time: string; name: string } = { time: "0000", name: "" };

app.get("/", (req: Request, res: Response) => {
  res.json("hello world");
});

app.get("/today", async (req, res) => {
  const getAPI = async (req: Request) => {
    const API_URL = `http://openAPI.seoul.go.kr:8088/${API_KEY}/json/TimeAverageAirQuality/1/25/${
      today.slice(0, 4) +
      today.slice(5, 7).replace(" ", "0") +
      today.slice(9, 11).replace(" ", "0") +
      list.time
    }/${list.name}`;
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

app.post("/today", async (req, res) => {
  list = {
    time: req.body.time,
    name: req.body.name,
  };
});

app.get("/yesterday", async (req, res) => {
  const getAPI = async (req: Request) => {
    const API_URL = `http://openAPI.seoul.go.kr:8088/${API_KEY}/json/TimeAverageAirQuality/1/25/${
      yesterday.slice(0, 4) +
      yesterday.slice(5, 7).replace(" ", "0") +
      yesterday.slice(9, 11).replace(" ", "0") +
      list.time
    }/${list.name}`;
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

app.post("/yesterday", async (req, res) => {
  list = {
    time: req.body.time,
    name: req.body.name,
  };
});

app.listen(port, () => console.log("running"));
