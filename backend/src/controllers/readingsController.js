import { ReadingsModel } from "../models/readingsModel.js";

// GET /api/readings
export async function getReadings(req, res) {
  try {
    const data = await ReadingsModel.list();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /api/readings/latest
export async function latestReading(req, res) {
  try {
    const data = await ReadingsModel.latest();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST /api/readings
export async function createReading(req, res) {
  try {
    const payload = req.body;
    const created = await ReadingsModel.create(payload);
    res.json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
