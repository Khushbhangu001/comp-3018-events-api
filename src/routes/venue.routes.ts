/**
 * @openapi
 * components:
 *   schemas:
 *     Venue:
 *       type: object
 *       properties:
 *         id: { type: string }
 *         name: { type: string }
 *         building: { type: string }
 *         room: { type: string }
 *         capacity: { type: integer }
 *         notes: { type: string, nullable: true }
 *         createdAt: { type: string }
 *         updatedAt: { type: string }
 *     CreateVenueInput:
 *       type: object
 *       required: [name, building, room, capacity]
 *       properties:
 *         name: { type: string }
 *         building: { type: string }
 *         room: { type: string }
 *         capacity: { type: integer }
 *         notes: { type: string }
 *
 * /api/venues:
 *   get:
 *     summary: List venues
 *     responses:
 *       200:
 *         description: List of venues
 *   post:
 *     summary: Create venue
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateVenueInput'
 *     responses:
 *       201:
 *         description: Created venue
 *
 * /api/venues/{id}:
 *   get:
 *     summary: Get venue by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Venue
 *       404:
 *         description: Not found
 *   put:
 *     summary: Update venue
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Updated venue
 *       404:
 *         description: Not found
 *   delete:
 *     summary: Delete venue
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204:
 *         description: Deleted
 *       404:
 *         description: Not found
 */
import { Router } from "express";
import * as venueController from "../controllers/venue.controller";

const venueRouter: Router = Router();

venueRouter.get("/", venueController.listVenues);
venueRouter.get("/:id", venueController.getVenueById);
venueRouter.post("/", venueController.createVenue);
venueRouter.put("/:id", venueController.updateVenue);
venueRouter.delete("/:id", venueController.deleteVenue);

export default venueRouter;