import {
  __resetForTests,
  createVenue,
  deleteVenue,
  getVenueById,
  listVenues,
  updateVenue,
} from "../src/repositories/venue.repository";

describe("venue.repository", () => {
  beforeEach(() => {
    __resetForTests();
  });

  it("starts empty", () => {
    expect(listVenues()).toEqual([]);
  });

  it("creates + lists + gets venue", () => {
    const created = createVenue({
      name: "Main Hall",
      building: "A",
      room: "101",
      capacity: 120,
    });

    expect(created.id).toEqual(expect.any(String));
    expect(created.createdAt).toEqual(expect.any(String));
    expect(created.updatedAt).toEqual(expect.any(String));
    expect(created.notes).toBeUndefined();

    expect(listVenues()).toHaveLength(1);

    const fetched = getVenueById(created.id);
    expect(fetched).not.toBeNull();
    expect(fetched).toMatchObject({
      id: created.id,
      name: "Main Hall",
      building: "A",
      room: "101",
      capacity: 120,
    });
  });

  it("returns null when venue id not found", () => {
    expect(getVenueById("missing")).toBeNull();
    expect(updateVenue("missing", { name: "X" })).toBeNull();
    expect(deleteVenue("missing")).toBe(false);
  });

  it("updates fields and bumps updatedAt", async () => {
    const created = createVenue({
      name: "Lab",
      building: "B",
      room: "202",
      capacity: 30,
      notes: "Initial",
    });

    // ensure time moves forward for updatedAt
    await new Promise((r) => setTimeout(r, 5));

    const updated = updateVenue(created.id, {
      capacity: 40,
      notes: "Changed",
    });

    expect(updated).not.toBeNull();
    expect(updated).toMatchObject({
      id: created.id,
      name: "Lab",
      building: "B",
      room: "202",
      capacity: 40,
      notes: "Changed",
      createdAt: created.createdAt,
    });
    expect(updated!.updatedAt).not.toBe(created.updatedAt);
  });

  it("can delete notes by setting notes: undefined in update payload", () => {
    const created = createVenue({
      name: "Room",
      building: "C",
      room: "303",
      capacity: 10,
      notes: "Temporary",
    });

    const updated = updateVenue(created.id, { notes: undefined });
    expect(updated).not.toBeNull();
    expect(updated!.notes).toBeUndefined();
  });

  it("deletes venue", () => {
    const created = createVenue({
      name: "Gym",
      building: "D",
      room: "1",
      capacity: 500,
    });

    expect(deleteVenue(created.id)).toBe(true);
    expect(getVenueById(created.id)).toBeNull();
    expect(listVenues()).toEqual([]);
  });
});

