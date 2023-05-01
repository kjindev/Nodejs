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

let list: { time: string; name: string } = { time: "0000", name: "" };

app.get("/", (req: Request, res: Response) => {
  res.json("hello world");
});

app.get("/today", async (req, res) => {
  let inputhYear = String(year);
  let inputMonth = "";
  let inputDay = "";
  if (String(month + 1).length === 1) {
    inputMonth = `0${month + 1}`;
  } else {
    inputMonth = String(month + 1);
  }
  if (String(day).length === 1) {
    inputDay = `0${day}`;
  } else {
    inputMonth = String(day);
  }
  const getAPI = async (req: Request) => {
    console.log("Today", inputhYear + inputMonth + inputDay);
    const API_URL = `http://openAPI.seoul.go.kr:8088/${API_KEY}/json/TimeAverageAirQuality/1/25/${
      inputhYear + inputMonth + inputDay + list.time
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
  res.send(list);
});

app.get("/yesterday", async (req, res) => {
  const today = new Date(year, month, day).toLocaleDateString();
  const yesterday = new Date(year, month, day - 1).toLocaleDateString();
  let inputhYear = yesterday.slice(0, 4);
  let inputMonth = "";
  let inputDay = yesterday.slice(-3, -1).replace(" ", "0");
  if (today.slice(5, 7) !== yesterday.slice(5, 7)) {
    if (yesterday[7] === "1") {
      inputMonth = yesterday.slice(5, 8).replace(" ", "0");
    } else {
      inputMonth = yesterday.slice(5, 7).replace(" ", "0");
    }
  } else {
    if (String(month + 1).length === 1) {
      inputMonth = `0${month}`;
    } else {
      inputMonth = String(month + 1);
    }
  }
  const getAPI = async (req: Request) => {
    console.log("yesterday", inputhYear + inputMonth + inputDay);
    const API_URL = `http://openAPI.seoul.go.kr:8088/${API_KEY}/json/TimeAverageAirQuality/1/25/${
      inputhYear + inputMonth + inputDay + list.time
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
  res.send(list);
});

app.get("/year", async (req, res) => {
  const getAPI = async (req: Request) => {
    const API_URL = `http://openAPI.seoul.go.kr:8088/${API_KEY}/json/YearlyAverageAirQuality/1/100/2022`;
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

app.post("/year", async (req, res) => {
  list = {
    time: req.body.time,
    name: req.body.name,
  };
  res.send(list);
});

app.listen(port, () => console.log("running"));
