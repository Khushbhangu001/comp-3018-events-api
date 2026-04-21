import { Router } from "express";
import * as venueController from "../controllers/venue.controller";

const venueRouter: Router = Router();

venueRouter.get("/", venueController.listVenues);
venueRouter.get("/:id", venueController.getVenueById);
venueRouter.post("/", venueController.createVenue);
venueRouter.put("/:id", venueController.updateVenue);
venueRouter.delete("/:id", venueController.deleteVenue);

export default venueRouter;