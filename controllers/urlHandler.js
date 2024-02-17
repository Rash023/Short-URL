const shortid = require("shortid");
const URL = require("../models/url");
async function generateShortUrl(req, res) {
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({
      error: "url is required",
    });
  }
  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitedHistory: [],
  });

  return res.status(400).json({ id: shortID });
}

async function getAnalytics(req, res) {
  const shortId = req.params.shortId;

  const result = await URL.findOne({ shortId });

  if (!result) {
    return res.status(400).json({
      error: "Analytics not found",
    });
  }

  return res.status(200).json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  generateShortUrl,
  getAnalytics,
};
