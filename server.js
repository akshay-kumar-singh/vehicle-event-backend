const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));
app.use(express.json());

const dataFile = "data.json";
let vehicleData = JSON.parse(fs.readFileSync(dataFile, "utf-8"));

app.get("/api/events", (req, res) => {
  res.json(vehicleData);
});

app.get("/api/events/type/:eventType", (req, res) => {
  const { eventType } = req.params;
  const filteredEvents = vehicleData.filter(event => event.eventType === eventType);
  res.json(filteredEvents);
});

app.get("/api/events/time", (req, res) => {
  const { start, end } = req.query;
  const startTime = new Date(start);
  const endTime = new Date(end);

  const filteredEvents = vehicleData.filter(event => {
    const eventTime = new Date(event.timestamp);
    return eventTime >= startTime && eventTime <= endTime;
  });

  res.json(filteredEvents);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
