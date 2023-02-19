import { Envuments } from "envuments";
import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import fs from "fs";
import https from "https";
import connRedis from "connect-redis";
import { createClient } from "redis";
import { Logger } from "tslog";

import { router as AuthRoutes } from "./routes/auth";
import { router as UserRoutes } from "./routes/user";
const InitializationLogger = new Logger({ name: "Initialization" });

require("./auth_methods/jwt");
require("./auth_methods/google");

// Bootstrap redis.
const redisSessionClient = createClient({
  url: Envuments.get("REDIS_CONNECTION_URL"),
  legacyMode: true,
});

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/api/auth", AuthRoutes);
app.use("/api/user", UserRoutes);

app.get("/api/", passport.authenticate(["jwt"], { session: false }), (req, res) => {
  res.send(req.user);
});

const httpsServer = https.createServer(
  {
    key: fs.readFileSync(Envuments.get("SSL_PRIVATE_KEY_PATH")),
    cert: fs.readFileSync(Envuments.get("SSL_CERT_PATH")),
  },
  app
);

(async () => {
  InitializationLogger.info("Connecting to Redis");
  await redisSessionClient.connect();
  InitializationLogger.info("Connected to Redis");
  app.listen(8080);
  InitializationLogger.info("Api is listening on port 443.");
  InitializationLogger.info("Done this?.");
})();
