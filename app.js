const express = require('express');
const app = express();
const path = require('path');


// middelware 
app.use(express.static(path.join(__dirname, "build")));
app.use(express.static("public"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
})

const PORT = 3003;
app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`Server is running on port ${PORT}`);
});