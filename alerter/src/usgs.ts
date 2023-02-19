import axios from "axios";
import { QuakeData } from "./quakeData";


export function getDateTimeStamp(date: Date) {
  return `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}T${date.getUTCHours()}:${date.getUTCMinutes()}:00`;
}

export async function getEarthQuakes(from: String, to: String): Promise<QuakeData[]> {
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