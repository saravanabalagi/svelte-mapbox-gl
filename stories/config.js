export const accessToken = process.env.MAPBOX_ACCESS_TOKEN;
export const globalMapboxGL = true;

export const defaultMapProps = {
  accessToken,
  globalMapboxGL,
  style: "mapbox://styles/mapbox/streets-v11",
}
