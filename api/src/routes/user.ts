import { Router } from "express";
import passport from "passport";
import { z } from "zod";
import { addLocation, deleteLocation, getLocations } from "../controllers/user";

const router = Router({
  mergeParams: true,
});

const LocationBody = z.object({
  longitude: z.number(),
  latitude: z.number(),
});
type LocationBody = z.infer<typeof LocationBody>;

router.put(
  "/location/:name",
  passport.authenticate(["jwt"], { session: false }),
  async (req, res) => {
    try {
      if (!req.user) return;
      const userId = (req.user as any).id;
      const name = req.params.name;

      const body = await LocationBody.parseAsync(req.body);
      const location = await addLocation(
        userId,
        name,
        body.latitude,
        body.longitude
      );
      res.send(location);
    } catch (ex) {
      res.sendStatus(400);
      return;
    }
  }
);

router.get(
  "/location/",
  passport.authenticate(["jwt"], { session: false }),
  async (req, res) => {
    if (!req.user) return;
    const userId = (req.user as any).id;
    res.send(await getLocations(userId));
  }
);

router.delete(
  "/location/:locationName",
  passport.authenticate(["jwt"], { session: false }),
  async (req, res) => {
    if (!req.user) return;
    const locName = req.params.locationName
    const userId = (req.user as any).id;

    res.send(deleteLocation(userId, locName));
  }
);

export { router };
