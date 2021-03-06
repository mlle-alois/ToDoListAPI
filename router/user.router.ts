import express from "express";
import { DatabaseUtils } from "../database/database-tests";
import { UserServiceImpl } from "../services/impl/user-service-impl";

const userRouter = express.Router();

userRouter.post("/", async function (req, res) {
  const id = req.body.id;
  const name = req.body.name;
  const firstname = req.body.firstname;
  const email = req.body.email;
  const password = req.body.password;
  const birthdate = req.body.birthdate;

  const connection = await DatabaseUtils.getConnection();
  const userService = new UserServiceImpl(connection);
  const user = await userService.createUser({
    id:0,
    name: name,
    firstname: firstname,
    email: email,
    password: password,
    birthdate: birthdate
  });

  console.log(id,name,firstname,email,password,birthdate);

  if (user !== null) {
    res.status(201);
    res.json(user);
  } else {
    res.status(500).end("Veuillez renseigner les informations nécessaires");
  }
});

userRouter.get("/isValid/:id", async function (req, res) {
  const connection = await DatabaseUtils.getConnection();
  const userService = new UserServiceImpl(connection);
  const user = await userService.getUserById(parseInt(req.params.id));
  const isValid = userService.isValid(user);

  if(user != null) {
    res.status(200);
    res.json(isValid).end();
  } else {
    res.status(404).end("L'utilisateur renseigné est inconnu.");
  }
});

export {
  userRouter
}