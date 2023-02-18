import { User } from "@prisma/client";
import { Envuments } from "envuments";
import passport from "passport";
import { OAuth2Strategy as GoogleAuthStrategry } from "passport-google-oauth";
import user from "../controllers/user";

const googleClientId = Envuments.get("GOOGLE_CLIENT_ID") ?? "";
const googleClientSecret = Envuments.get("GOOGLE_CLIENT_SECRET") ?? "";

passport.use(
  new GoogleAuthStrategry(
    {
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: "https://checkedon.tech/api/auth/redirect/google",
    },
    async (accessToken: string, refreshToken: string, profile, done) => {
      const googleId = profile.id;

      let foundUser: User | null = await user.findFirst({
        where: {
          googleId: googleId,
        },
      });

      if (foundUser == null) {
        foundUser = await user.create({
          data: {
            userName: profile.displayName,
            googleId: googleId,
          },
        })!;
      }
      return done(null, {
        name: foundUser.userName,
        id: foundUser.id,
        googleId: foundUser.googleId,
      });
    }
  )
);
export default 1;