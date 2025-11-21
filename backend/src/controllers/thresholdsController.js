import { ThresholdsModel } from "../models/thresholdsModel.js";

export async function getThresholds(req, res) {
  try {
    const data = await ThresholdsModel.list();
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export async function latestThreshold(req, res) {
  try {
    const data = await ThresholdsModel.latest();
    return res.json(data ?? null);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export async function createThreshold(req, res) {
  try {
    const created = await ThresholdsModel.create(req.body);
    return res.json(created);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}
