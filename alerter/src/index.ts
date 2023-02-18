import axios from "axios";
import { Envuments } from "envuments";
import { createConnection, Connection } from "mysql2/promise";

let conn: Connection | undefined;

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

function getDateTimeStamp(date: Date) {
  return `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}T${date.getUTCHours()}:${date.getUTCMinutes()}:00`;
}

interface QuakeData {
  magnitude: number;
  lat: number;
  lon: number;
  placeNiceName: string;
}

async function getEarthQuakes(from: String, to: String): Promise<QuakeData[]> {
  const data = await axios.get(
    `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${from}&endtime=${to}&minmagnitude=4`
  );
  const quakes: QuakeData[] = [];
  for (const feature of data.data.features) {

    console.log(feature);
    const place = feature.properties.place;
    console.log(place);
    const mag = feature.properties.mag;
    const coords = feature.geometry.coordinates;
    const lat = coords[0];
    const lon = coords[1];
    quakes.push({
      magnitude: mag,
      placeNiceName: place,
      lon: lon,
      lat: lat,
    });
  }
  return quakes;
}

(async () => {
  conn = await createConnection(Envuments.get("DATABASE_URL"));
  const quakes = await getEarthQuakes(
    getDateTimeStamp(new Date(Date.now())),
    getDateTimeStamp(new Date(Date.now() + 24 * 60 * 60 * 1000))
  );

  const map : any = {}
  for(const quake of quakes){
    const data : any[] = await getAllLocationsInDistance(quake.lat, quake.lon, 10000) as any[];
    for(const it of data){
      const userId = it.id;
      // TODO: alert lol.
    }

  }

  setInterval(async () => {

  }, 30000);

  // console.log();
})();
