import type { Request, Response } from "express";
import * as venueService from "../services/venue.service";
import { createVenueSchema, updateVenueSchema } from "../validators/venue.validator";

function sendNotFound(res: Response): void {
  res.status(404).json({ message: "Venue not found" });
}

export function listVenues(_req: Request, res: Response): void {
  res.json(venueService.listVenues());
}

export function getVenueById(req: Request, res: Response): void {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: "Missing id" });
    return;
  }

  const venue = venueService.getVenueById(id);
  if (!venue) {
    sendNotFound(res);
    return;
  }

  res.json(venue);
}

export function createVenue(req: Request, res: Response): void {
  const { error, value } = createVenueSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    res.status(400).json({ message: "Validation error", details: error.details });
    return;
  }

  res.status(201).json(venueService.createVenue(value));
}

export function updateVenue(req: Request, res: Response): void {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: "Missing id" });
    return;
  }

  const { error, value } = updateVenueSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    res.status(400).json({ message: "Validation error", details: error.details });
    return;
  }

  const updated = venueService.updateVenue(id, value);
  if (!updated) {
    sendNotFound(res);
    return;
  }

  res.json(updated);
}

export function deleteVenue(req: Request, res: Response): void {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: "Missing id" });
    return;
  }

  const deleted = venueService.deleteVenue(id);
  if (!deleted) {
    sendNotFound(res);
    return;
  }

  res.status(204).send();
}