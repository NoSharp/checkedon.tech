import { Envuments } from "envuments";
import { sign } from "jsonwebtoken";

export function generateJWT(userId: number) {
  return sign(
    {
      userId: userId,
    },
    Envuments.get("JWT_SECRET"),
    {
      algorithm: "HS256",
      expiresIn: "1d",
      audience: Envuments.get("JWT_AUDIENCE"),
      issuer: Envuments.get("JWT_ISSUER"),
    }
  );
}
