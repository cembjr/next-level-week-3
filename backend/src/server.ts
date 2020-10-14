import "./database/connection";
import path from "path";
import express from "express";
import "express-async-errors";
import cors from 'cors';

import routeOrphanages from "./api/routes";
import errorHandler from "./errors/handler";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/orphanages", routeOrphanages);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use(errorHandler);

app.listen(3333);

console.log("ouvindo porta 3333");
