import { NextResponse } from "next/server";

export async function POST(req) {
  const request = await req.json();

  const { data } = request;

  const latlng = encodeURIComponent(`${data.latitude},${data.longitude}`);
  const result = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&location_type=ROOFTOP&result_type=street_address&key=${process.env.GOOGLE_API_KEY}`,
  );
  const json = await result.json();
  console.log(json);
  const street_address = json.results[0].formatted_address;
  return NextResponse.json({ location: street_address });
}
