import { Router } from "express";
import passport from "passport";
import { generateJWT } from "../utils/jwt_gen";

// async function setUserToken(req: any, res) {
//   const userId = req.user.id;
  
  
//   // send({
//   //   token: ,
//   // });
// }

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
  (req, res)=>{
    const userId = (req.user as any).id;
    res
      .cookie("access_token", generateJWT(userId))
      .redirect("/");
  }
);

export { router };
