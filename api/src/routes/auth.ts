import { PrismaClient, User } from "@prisma/client";
import { Envuments } from "envuments";
import { Router } from "express";
import passport from "passport";

import { OAuth2Strategy as GoogleAuthStrategry } from "passport-google-oauth";
const googleClientId = Envuments.get("GOOGLE_CLIENT_ID") ?? "";
const googleClientSecret = Envuments.get("GOOGLE_CLIENT_SECRET") ?? "";



export function bootstrapPassport() {
  const prisma = new PrismaClient();
  console.log("Boot strapping?");
  //#region Initialize Passport
  passport.use(
    new GoogleAuthStrategry(
      {
        clientID: googleClientId,
        clientSecret: googleClientSecret,
        callbackURL: "/auth/redirect/google",
      },
      async (accessToken: string, refreshToken: string, profile, done) => {
        console.log("VERIFY");
        const googleId = profile.id;

        let foundUser: User | null = await prisma.user.findFirst({
          where: {
            googleId: googleId,
          },
        });

        if (foundUser == null) {
          foundUser = await prisma.user.create({
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

  // Used to set the user in the request.
  passport.serializeUser((user: any, cb) => {
    console.log(user);
    cb(null, {
      displayName: user.name,
      id: user.id,
      googleId: user.googleId,
      user: true,
    });
  });

  passport.deserializeUser((user: any, cb) => {
    return cb(null, user);
  });
}
//#endregion

const router = Router({
  mergeParams: true,
});

router.get(
  "/method/google",
  passport.authenticate("google", { scope: ["profile"] })
);

router.get(
  "/redirect/google",
  passport.authenticate("google", {
    successReturnToOrRedirect: "/",
    failureRedirect: "/auth/method/google",
  })
);

export { router };
