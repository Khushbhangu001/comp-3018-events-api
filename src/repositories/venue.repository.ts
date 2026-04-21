import type { CreateVenueInput, UpdateVenueInput, Venue } from "../models/venue";

const venuesById = new Map<string, Venue>();

function nowIso(): string {
  return new Date().toISOString();
}

function genId(): string {
  // Node 20+ (you’re on node 24)
  return globalThis.crypto.randomUUID();
}

export function listVenues(): Venue[] {
  return [...venuesById.values()];
}

export function getVenueById(id: string): Venue | null {
  return venuesById.get(id) ?? null;
}

export function createVenue(input: CreateVenueInput): Venue {
  const id = genId();
  const ts = nowIso();

  const venue: Venue = {
    id,
    name: input.name,
    building: input.building,
    room: input.room,
    capacity: input.capacity,
    notes: input.notes,
    createdAt: ts,
    updatedAt: ts,
  };

  venuesById.set(id, venue);
  return venue;
}

export function updateVenue(id: string, input: UpdateVenueInput): Venue | null {
  const existing = venuesById.get(id);
  if (!existing) return null;

  const next: Venue = {
    ...existing,
    name: input.name ?? existing.name,
    building: input.building ?? existing.building,
    room: input.room ?? existing.room,
    capacity: input.capacity ?? existing.capacity,
    updatedAt: nowIso(),
  };

  if (Object.prototype.hasOwnProperty.call(input, "notes")) {
    next.notes = input.notes;
  }

  venuesById.set(id, next);
  return next;
}

export function deleteVenue(id: string): boolean {
  return venuesById.delete(id);
}