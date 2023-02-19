import { QuakeData } from "../quakeData";
import Twilio from "twilio";
import { Envuments } from "envuments";

const client = Twilio(
  Envuments.get("TWILIO_ACCOUNT_SID"),
  Envuments.get("TWILIO_API_KEY")
);

export default {
  method: "sms",
  action: (phoneNumber: string, quake: QuakeData) => {
    client.messages.create({
      from: Envuments.get("TWILIO_ACCOUNT_NUMBER"),
      to: phoneNumber,
      body: `Earthquake Detected at: ${quake.placeNiceName} Magnitude: ${quake.magnitude}`,
    });
  },
};
