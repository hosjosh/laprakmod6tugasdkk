import express from "express";
import { getReadings, createReading, latestReading } from "../controllers/readingsController.js";

const router = express.Router();

router.get("/", getReadings);
router.get("/latest", latestReading);
router.post("/", createReading);

export default router;
