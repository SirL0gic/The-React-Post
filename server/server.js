const express = require("express");
const compression = require("compression");
const dotenv = require("dotenv");
const axios = require("axios");
const { MongoClient, ServerApiVersion } = require("mongodb");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const sqlite3 = require('sqlite3').verbose();
const dbPath = "./newsDatabase.db"; // SQLite database file path
const sentiment = require("textanalyser.js")

dotenv.config();

// Configuration
const HOST = "127.0.0.1";
const PORT = 4000;
const MONGODB_URI = process.env.MONGODB_URI;
const WEATHER_API_KEY = process.env.WEATHERAPI;

// Initialize Express app
const app = express();


// CORS Configuration
// app.use(cors()); // For Debug
app.use(
  cors({
    origin: (origin, callback) => {
      if (origin === "https://www.thereactpost.xyz" || origin === "https://thereactpost.xyz") {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

//Custom error handler for CORS errors
app.use((err, req, res, next) => {
  if (err.message === "Not allowed by CORS") {
    res.status(403).send("CORS Error: Not allowed by CORS");
  } else {
    next(err);
  }
});

app.use(compression());
app.use(express.json());

app.set('trust proxy', 1);
// Rate Limiting Middleware
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    message: "Too many requests from this IP, please try again later.",
  })
);

// Routes
app.post("/api/weather", async (req, res) => {
  const { ip } = req.body;
  if (!ip) return res.status(400).json({ error: "IP address is required" });

  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${ip}`
    );
    const data = response.data;

    return res.json({
      country: data.location.country,
      city: data.location.name,
      temperatureInC: data.current.temp_c,
      conditionText: data.current.condition.text,
      icon: data.current.condition.icon,
    });
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    return res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

app.get("/api/test", (req, res) =>
  res.send(`Server is running on ${HOST}:${PORT}`)
);

app.get("/api/mongo-test", async (req, res) => {
  const client = new MongoClient(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    res.send("MongoDB connection successful!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    res.status(500).send("Error connecting to MongoDB");
  } finally {
    await client.close();
  }
});


app.get("/api/top-headlines", (req, res) => {
  let db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
          return res.status(500).send("Error occurred: " + err.message);
      }
  });

  const query = "SELECT * FROM top_news LIMIT 10"; 

  db.all(query, [], (err, rows) => {
      if (err) {
          res.status(500).send("Error occurred: " + err.message);
          throw err;
      }
      res.status(200).send(rows);
      console.log("News Data Sent");
  });

  db.close();
});

app.post("/api/senti", async (req,res) => {
  console.log(typeof(req.body.textual))
  console.log(req.body.textual)
  let final_analysis = await sentiment(req.body.textual);
  res.send(final_analysis)
  console.log(final_analysis)
})

app.listen(PORT, HOST, () => console.log(`Server started on ${HOST}:${PORT}`));
