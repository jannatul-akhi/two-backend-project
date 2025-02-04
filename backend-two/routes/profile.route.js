import express from "express";
import {
  createProfile,
  updateProfile,
} from "../controllers/profiles.controller.js";

const route = express.Router();

route.post("/", createProfile);
route.patch("/:userId", updateProfile);

export default route;
