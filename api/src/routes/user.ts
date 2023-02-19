import { Router } from "express";
import passport from "passport";
import { z } from "zod";
import user, {
  addLocation,
  addSMSConnection,
  deleteLocation,
  deletePhoneNumber,
  getLocations,
  getSMSConnections,
} from "../controllers/user";

const router = Router({
  mergeParams: true,
});

const LocationBody = z.object({
  longitude: z.number(),
  latitude: z.number(),
});
type LocationBody = z.infer<typeof LocationBody>;

const SMSAddBody = z.object({
  phoneNumber: z.string().regex(/^\+[1-9]\d{1,14}$/),
});
type SMSAddBody = z.infer<typeof SMSAddBody>;

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
    const locName = req.params.locationName;
    const userId = (req.user as any).id;

    res.send(await deleteLocation(userId, locName));
  }
);

router.get(
  "/connections/sms",
  passport.authenticate(["jwt"], { session: false }),
  async (req, res) => {
    if (!req.user) return;
    const userId = (req.user as any).id;

    res.send(await getSMSConnections(userId));
  }
);

router.put(
  "/connections/sms",
  passport.authenticate(["jwt"], { session: false }),
  async (req, res) => {
    if (!req.user) return;
    try {
      const userId = (req.user as any).id;
      const data = await SMSAddBody.parseAsync(req.body);
      res.send(await addSMSConnection(userId, data.phoneNumber));
    } catch (ex) {
      // pass.
      res.send(400);
    }
  }
);

router.delete(
  "/connections/sms/:phoneNumber",
  passport.authenticate(["jwt"], { session: false }),
  async (req, res) => {
    if (!req.user) return;
    try {
      const userId = (req.user as any).id;
      res.send(await deletePhoneNumber(userId, req.params.phoneNumber));
    } catch (ex) {
      // pass.
      res.send(400);
    }
  }
);


export { router };
