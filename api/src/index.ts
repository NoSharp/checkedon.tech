import { Envuments } from "envuments";
import express from "express";
import session from "express-session";
import passport from "passport";
import fs from "fs";
import https from "https";
import connRedis from "connect-redis";
import { createClient } from "redis";
import { Logger } from "tslog";

import { router as AuthController, bootstrapPassport } from "./routes/auth";
import { PrismaClient } from "@prisma/client";

const InitializationLogger = new Logger({ name: "Initialization" });

const RedisStore = connRedis(session);
// Bootstrap redis.
const redisSessionClient = createClient({
  url: Envuments.get("REDIS_CONNECTION_URL"),
  legacyMode: true
});

bootstrapPassport();

const app = express();
app.use(express.json());
app.use(
  session({
    secret: Envuments.get("SESSION_SECRET"),
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({ client: redisSessionClient }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", AuthController);

app.get("/", (req, res) => {
  res.send(`Hello: ${(req.user as any)["displayName"] ?? "not logged in"}`);
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
  httpsServer.listen(443);
  InitializationLogger.info("Api is listening on port 443.");
  InitializationLogger.info("Done this?.");
})();
