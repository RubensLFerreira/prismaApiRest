import { Router } from "express";

import UserController from "./controllers/UserController";
import PostController from "./controllers/PostController";

const router = Router();

// user
router.get("/users", UserController.findAllUsers);
router.get("/user/:id", UserController.findUser);
router.post("/user", UserController.createUser);
router.put("/user/:id", UserController.updateUser);
router.delete("/user/:id", UserController.deleteUser);

// post
router.get("/post/user", PostController.findAllPosts);
router.post("/post/user/:id", PostController.createPost);
router.put("/post/:id", PostController.updatePost);
router.delete("/post/:id", PostController.deletePost);

export { router };
