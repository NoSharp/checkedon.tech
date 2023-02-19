import { Envuments } from "envuments";
import { createConnection, Connection, RowDataPacket } from "mysql2/promise";
import { QuakeData } from "./quakeData";
import { getDateTimeStamp, getEarthQuakes } from "./usgs";
let conn: Connection | undefined;

interface Distributor {
  method: string;
  action: (metaData: string, quake: QuakeData) => void;
}

import SMSDistributor from "./distributors/sms";

const distributors: { [key: string]: Distributor } = {
  sms: SMSDistributor,
};

async function getAllLocationsInDistance(
  targetLatitude: number,
  targetLongitude: number,
  km: number
) {
  if (conn == null) {
    throw new Error("cannot connect to mysql.");
  }
  const [data, _] = await conn.execute(
    `SELECT User.id FROM UserLocations
    INNER JOIN User on UserLocations.userId = User.id
    WHERE haversine_distance(?,?, latitude, longitude) < ?`,
    [targetLatitude, targetLongitude, km]
  );
  return data;
}

async function getConnections(userId: number) {
  if (conn == null) {
    throw new Error("cannot connect to mysql.");
  }
  const [data, _] = await conn.execute(
    `SELECT * FROM UserAlertMethod WHERE userId = ? `,
    [userId]
  );
  return data;
}

(async () => {
  conn = await createConnection(Envuments.get("DATABASE_URL"));

  setInterval(async () => {
    const quakes = await getEarthQuakes(
      getDateTimeStamp(new Date(Date.now())),
      getDateTimeStamp(new Date(Date.now() + 24 * 60 * 60 * 1000))
    );
    const map: any = {};
    for (const quake of quakes) {
      const data: any[] = (await getAllLocationsInDistance(
        quake.lat,
        quake.lon,
        10000
      )) as any[];
      for (const it of data) {
        const userId = it.id;
        const connections: any[] = (await getConnections(userId)) as any[];
        for (const conn of connections) {
          if (conn.method == null) continue;
          const targetDistributor = distributors[conn.method];
          if (targetDistributor == null) {
            console.log("No distributor for: " + conn.method);
            continue;
          }

          targetDistributor.action(conn.methodMetaData, quake);
        }
      }
    }
  }, 30000);

  // console.log();
})();
