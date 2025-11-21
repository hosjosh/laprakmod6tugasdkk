import express from "express";
import {
  getThresholds,
  latestThreshold,
  createThreshold
} from "../controllers/thresholdsController.js";

const router = express.Router();

router.get("/", getThresholds);        // GET all thresholds
router.get("/latest", latestThreshold); // GET latest threshold (WAJIB!)
router.post("/", createThreshold);     // POST create new threshold

export default router;
