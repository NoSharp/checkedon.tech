import { Envuments } from "envuments";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import user from "../controllers/user";

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
      secretOrKey: Envuments.get("JWT_SECRET"),
      issuer: "api.checkedon.tech",
      audience: "api.checkedon.tech",
    },
    async (jwtPayload, cb) => {
      const foundUser = await user.findFirst({
        where: {
          id: jwtPayload.userId,
        },
      });

      if (foundUser == null) {
        return cb(null, false);
      }

      return cb(null, foundUser, jwtPayload);
    }
  )
);

export default 1;