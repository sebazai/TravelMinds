import { NextResponse } from 'next/server';

export async function POST(req) {
  console.log('CALLING POST /API/PLACES/NAME');
  const request = await req.json();

  const { data } = request;

  const latlng = encodeURIComponent(`${data.latitude},${data.longitude}`);
  const result = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&result_type=street_address|locality&key=${process.env.GOOGLE_API_KEY}`,
  );
  const json = await result.json();
  const street_address =
    json.results?.[0]?.formatted_address ?? json['plus_code'].compound_code;
  const country = json.results?.[0]?.address_components?.find((component) =>
    component.types.includes('country'),
  )?.long_name;
  const locality = json.results?.[0]?.address_components?.find((component) =>
    component.types.includes('locality'),
  )?.long_name;
  return NextResponse.json({
    location: street_address,
    country: country,
    locality: locality,
  });
}
