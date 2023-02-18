import { Router } from "express";
import passport from "passport";
import { generateJWT } from "../utils/jwt_gen";

async function setUserToken(req: any, res: any) {
  const userId = req.user.id;
  res.send({
    token: generateJWT(userId),
  });
}

const router = Router({
  mergeParams: true,
});

router.get(
  "/method/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  })
);

router.get(
  "/redirect/google",
  passport.authenticate("google", {
    session: false,
  }),
  setUserToken
);

export { router };
