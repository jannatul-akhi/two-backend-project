import express from "express";
import { createUser, singleUser } from "../controllers/user.controller.js";

const route = express.Router();

route.post("/", createUser);
route.get("/:id", singleUser);

export default route;
