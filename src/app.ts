import express from "express";

const app = express();
const port = 4000;
const cors = require("cors");

const dataRouter = require("./routes/data");
const locationRouter = require("./routes/location");

app.use(cors(["http://localhost:3000", "https://seoul-air.vercel.app"]));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/data", dataRouter);
app.use("/location", locationRouter);

app.get("/", (req, res) => {
  res.send("Seoul-Air-Project의 API를 제공하는 메인 페이지 입니다.");
});

app.listen(port, () => console.log("running"));
