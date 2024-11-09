import { NextResponse } from 'next/server';

export async function POST(req) {
  const request = await req.json();
  const { textinput, data } = request;

  const latitude = data.location[0];
  const longitude = data.location[1];
  const encodedTextInput = encodeURIComponent(textinput);
  const encodedLocationBios = encodeURIComponent(
    `circle:2000@${latitude},${longitude}`
  );

  // https://developers.google.com/maps/documentation/places/web-service/search-find-place
  const googleFindPlaceUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&input=${encodedTextInput}&inputtype=textquery&locationbias=${encodedLocationBios}&key=${process.env.GOOGLE_API_KEY}`;

  const googleResponse = await fetch(googleFindPlaceUrl);
  const googleData = await googleResponse.json();

  return NextResponse.json(googleData, { status: 200 });
}
