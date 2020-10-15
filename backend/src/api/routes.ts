import { Router, Request, Response } from "express";
import { getRepository } from "typeorm";
import OrphanagesController from "./controllers/OrphanagesController";
import multer from 'multer';
import uploadConfig from '../config/upload';

const upload = multer(uploadConfig);

const routeOrphanages = Router();


routeOrphanages.get("/", OrphanagesController.list);
routeOrphanages.get("/:id", OrphanagesController.show);
routeOrphanages.post("/", upload.array('images', 10), OrphanagesController.create);

export default routeOrphanages;
