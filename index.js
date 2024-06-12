const express = require("express");
const { connectToMongoDB } = require("./database/connect");
require("dotenv").config();
const URL = require("./models/url");
const app = express();
const urlRoute = require("./routes/url");

app.use(express.json());

const PORT = process.env.PORT || 3000;

connectToMongoDB(process.env.DATABASE_URL).then(
  console.log("MongoDB Connected")
);

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => {
  console.log(`App is running or ${PORT}`);
});
