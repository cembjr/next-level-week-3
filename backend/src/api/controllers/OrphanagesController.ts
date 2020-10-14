import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Orphanage from "../../models/Orphanage";
import OrphanageView from "../views/OrphanageView";
import * as Yup from "yup";

export default {
  async list(request: Request, response: Response): Promise<Response> {
    const _repository = getRepository(Orphanage);
    const orphanages = await _repository.find({
      relations: ["images"],
    });

    return response.json(OrphanageView.getOrphanages(orphanages));
  },

  async show(request: Request, response: Response): Promise<Response> {
    const _repository = getRepository(Orphanage);
    const { id } = request.params;

    const orphanage = await _repository.findOneOrFail(id, {
      relations: ["images"],
    });

    return response.json(OrphanageView.getOrphage(orphanage));
  },

  async create(request: Request, response: Response): Promise<Response> {
    const _repository = getRepository(Orphanage);

    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = request.body;

    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map((image) => {
      return { path: image.filename };
    });

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const orphanage = _repository.create(data);

    console.log(orphanage);

    await _repository.save(orphanage);

    return response.status(201).json(orphanage);
  },
};