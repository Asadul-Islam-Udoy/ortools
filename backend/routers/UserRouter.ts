import express from "express";
import {
  createUserController,
  loginUserController,
  logoutUserController,
  getAllUsers,
} from "../controllers/UserController";

const router = express.Router();
router.post("/create", createUserController);
router.post("/login", loginUserController);
router.get("/logout", logoutUserController);
router.get("/get", getAllUsers);


export default router;
