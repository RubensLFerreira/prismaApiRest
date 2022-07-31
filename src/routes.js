import { Router } from "express";

import UserController from "./controllers/userController";

const router = Router();

router.get("/users", UserController.findAllUsers);
router.get("/user/:id", UserController.findUser);
router.post("/user", UserController.createUser);
router.put("/user/:id", UserController.updateUser);
router.delete("/user/:id", UserController.deleteUser);

export { router };
