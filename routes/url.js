const express = require("express");
const { generateShortUrl, getAnalytics } = require("../controllers/urlHandler");

const router = express.Router();

router.post("/", generateShortUrl);

router.get("/analytics/:shortId", getAnalytics);
module.exports = router;
