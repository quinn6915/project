import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { User } from "../models/User";

declare module "jsonwebtoken" {
  export function verify(
    token: string,
    secretOrPublicKey: string | Buffer,
    options?: VerifyOptions
  ): { userId: string };
}

export const register = (req: Request, res: Response) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        name: req.body.name,
        password: hash,
      });
      user
        .save()
        .then((value) => res.status(201).json(value))
        .catch((error) => {
          res.json({ error });
        });
    })
    .catch((error) => res.status(500).json({ error }));
};

export const login = (req: Request, res: Response) => {
  User.findOne({ name: req.body.name })
    .then((user) => {
      if (!user) {
        return res.json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            name: user.name,
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

export const isLogged = (req: any, res: Response) => {
  const token = req.headers.authorization;
  jwt.verify(token, "RANDOM_TOKEN_SECRET", function (err: any, decoded: any) {
    if (err) {
      return res.json(null);
    } else {
      User.findOne({ _id: decoded.userId })
        .then((user) =>
          res.status(200).json({
            userId: user?.id,
            name: user?.name,
          })
        )
        .catch((error) => res.status(404).json({ error }));
    }
  });
};
