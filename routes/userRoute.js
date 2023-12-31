import express from "express";
import {Router} from "express";
import {login} from "../controllers/userController.js";
const router = Router(); // Use lowercase 'router' here

router.post("/", login);

export default router;
