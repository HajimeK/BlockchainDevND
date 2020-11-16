const express = require("express")
const app = express()

app.get("/health", function (req, res) {
  res.json([{
    status: "healthy"
  }])
})

app.listen(9999)