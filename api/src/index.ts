import { Envuments } from "envuments";
import express from "express";
import session from "express-session";
import passport from "passport";
import fs from "fs";
import https from "https";
import { OAuth2Strategy as GoogleAuthStrategry } from "passport-google-oauth";

import {router as AuthController} from "./controllers/auth";

const googleClientId = Envuments.get("GOOGLE_CLIENT_ID") ?? "";
const googleClientSecret = Envuments.get("GOOGLE_CLIENT_SECRET") ?? "";

//#region Initialize Passport
passport.use(new GoogleAuthStrategry({
  clientID: googleClientId,
  clientSecret: googleClientSecret,
  callbackURL: "/auth/redirect/google",
},
(accessToken: string, refreshToken: string, profile, done) => {
  return done(null, {
    displayName: profile.displayName,
  });
}));

// Used to set the user in the request.
passport.serializeUser((user: any, cb) => {
  cb(null, {
    displayName: user.displayName,
    user: true
  });
});

passport.deserializeUser((user: any, cb) => {
  return cb(null, user);
});
//#endregion

const app = express();
app.use(express.json());
app.use(
  session({
    secret: Envuments.get("SESSION_SECRET"),
    resave: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", AuthController);

const httpsServer = https.createServer({
  key: fs.readFileSync(Envuments.get("SSL_PRIVATE_KEY_PATH")),
  cert: fs.readFileSync(Envuments.get("SSL_CERT_PATH"))
}, app)

httpsServer.listen(443);