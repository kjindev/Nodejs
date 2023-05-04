import express, { Request, Response } from "express";
require("dotenv").config();
const axios = require("axios");

const router = express.Router();
const { API_KEY } = process.env;

let list: { date: string; time: string; name: string } = {
  date: "",
  time: "",
  name: "",
};

router.get("/", async (req, res) => {
  const getAPI = async (req: Request) => {
    const API_URL = `http://openAPI.seoul.go.kr:8088/${API_KEY}/json/TimeAverageAirQuality/1/25/${
      list.date + list.time
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

router.post("/", async (req, res) => {
  list = {
    date: req.body.date,
    time: req.body.time,
    name: req.body.name,
  };
  res.send(list);
});

module.exports = router;
