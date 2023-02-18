import { Router } from "express";
import passport from "passport";

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

export {router};
