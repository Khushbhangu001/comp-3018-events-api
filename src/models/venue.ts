export type Venue = {
  id: string;
  name: string;
  building: string;
  room: string;
  capacity: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateVenueInput = {
  name: string;
  building: string;
  room: string;
  capacity: number;
  notes?: string;
};

export type UpdateVenueInput = Partial<CreateVenueInput>;