import { NextResponse } from 'next/server';

export async function POST(req) {
  const request = await req.json();

  const { data } = request;

  const latlng = encodeURIComponent(`${data.latitude},${data.longitude}`);
  const result = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&result_type=neighborhood&key=${process.env.GOOGLE_API_KEY}`,
  );
  const json = await result.json();
  const street_address =
    json.results?.[0]?.formatted_address ?? json['plus_code'].compound_code;
  return NextResponse.json({ location: street_address });
}
