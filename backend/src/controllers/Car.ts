import { Request, Response } from "express";
import { io } from "..";
import { Car } from "../models/Car";
import { Comment } from "../models/Comment";

export const create = (req: Request, res: Response) => {
  /*const carObject = JSON.parse(req.body.car);
  delete carObject.file;
  delete carObject._id;
  const car = new Car({
    ...carObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    date: new Date(),
  });
  car
    .save()
    .then((t) =>
      t
        .populate("user")
        .execPopulate()
        .then((car) => res.status(201).json(car))
    )
    .catch((error: Error) => res.status(400).json({ error }));*/
};

export const modify = (req: Request, res: Response) => {
  Car.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(async () => {
      const value = await Car.findOne({ _id: req.params.id });
      res.status(200).json(value);
    })
    .catch((error) => res.status(400).json({ error }));
};

export const deleteCar = (req: Request, res: Response) => {
  Car.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json(req.params.id))
    .catch((error) => res.status(400).json({ error }));
};

export const getOne = (req: Request, res: Response) => {
  Car.findOne({ _id: req.params.id })
    .then((car) => res.status(200).json(car))
    .catch((error) => res.status(404).json({ error }));
};

export const getAll = (req: Request, res: Response) => {
  Car.find()
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .populate("user")
    .then((cars) => {
      res.status(200).json(cars);
    })
    .catch((error) => res.status(400).json({ error }));
};

export const comment = (req: Request, res: Response) => {
  const comment = new Comment({
    car: req.params.id,
    user: req.body.user,
    content: req.body.content,
    date: new Date(),
  });
  comment
    .save()
    .then(async (result) => {
      let car = await Car.findOne({ _id: req.params.id });
      car?.comments.push(result);
      car?.save().then((t) =>
        t
          .populate({
            path: "comments",
            populate: {
              path: "user",
            },
          })
          .populate("user")
          .execPopulate()
          .then((car) => res.status(201).json(car))
      );
    })
    .catch((error: Error) => res.status(400).json({ error }));
};
