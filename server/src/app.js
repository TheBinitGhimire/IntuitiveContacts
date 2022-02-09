import bodyParser from "body-parser";
import compression from "compression";
import config from "./config/config.js";
import cors from "cors";
import express from "express";
import methodOverride from "method-override";
import mongoose from "mongoose";
import passport from "passport";
import router from "./api/routes/index.js";
import jwt from "./config/jwt.js";

mongoose.connect(config.mongodb.uri);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compression());

app.use(methodOverride());
app.use(cors({
  origin: "*"
}));

app.use(passport.initialize());
passport.use("jwt", jwt);

app.use("/api", router);

app.listen(config.port, () => {
  console.log(`The server has been started at port ${config.port}.`);
});