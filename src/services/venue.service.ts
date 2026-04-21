import * as venueRepo from "../repositories/venue.repository";
import type { CreateVenueInput, UpdateVenueInput, Venue } from "../models/venue";

export function listVenues(): Venue[] {
  return venueRepo.listVenues();
}

export function getVenueById(id: string): Venue | null {
  return venueRepo.getVenueById(id);
}

export function createVenue(input: CreateVenueInput): Venue {
  return venueRepo.createVenue(input);
}

export function updateVenue(id: string, input: UpdateVenueInput): Venue | null {
  return venueRepo.updateVenue(id, input);
}

export function deleteVenue(id: string): boolean {
  return venueRepo.deleteVenue(id);
}