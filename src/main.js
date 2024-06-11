const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");

const app = express();
const prisma = new PrismaClient();

const userRoute = require("./routes/userroutes");
const postRoute = require("./routes/postroutes");


app.use(express.json());
app.use(bodyParser.json());

const port = 4040;

app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);


app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
