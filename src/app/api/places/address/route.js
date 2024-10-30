import { NextResponse } from "next/server";

// Example Google Geolocation output
// {
//   "results": [
//     {
//       "address_components": [
//         {
//           "long_name": "2",
//           "short_name": "2",
//           "types": [
//             "street_number"
//           ]
//         },
//         {
//           "long_name": "Persiaran Perdana",
//           "short_name": "Persiaran Perdana",
//           "types": [
//             "route"
//           ]
//         },
//         {
//           "long_name": "Presint 1",
//           "short_name": "Presint 1",
//           "types": [
//             "political",
//             "sublocality",
//             "sublocality_level_1"
//           ]
//         },
//         {
//           "long_name": "Putrajaya",
//           "short_name": "Putrajaya",
//           "types": [
//             "locality",
//             "political"
//           ]
//         },
//         {
//           "long_name": "Wilayah Persekutuan Putrajaya",
//           "short_name": "Wilayah Persekutuan Putrajaya",
//           "types": [
//             "administrative_area_level_1",
//             "political"
//           ]
//         },
//         {
//           "long_name": "Malaysia",
//           "short_name": "MY",
//           "types": [
//             "country",
//             "political"
//           ]
//         },
//         {
//           "long_name": "62000",
//           "short_name": "62000",
//           "types": [
//             "postal_code"
//           ]
//         }
//       ],
//       "formatted_address": "2, Persiaran Perdana, Presint 1, 62000 Putrajaya, Wilayah Persekutuan Putrajaya, Malaysia",
//       "geometry": {
//         "bounds": {
//           "northeast": {
//             "lat": 2.9344196,
//             "lng": 101.6906069
//           },
//           "southwest": {
//             "lat": 2.9343164,
//             "lng": 101.6904987
//           }
//         },
//         "location": {
//           "lat": 2.934369,
//           "lng": 101.6905627
//         },
//         "location_type": "ROOFTOP",
//         "viewport": {
//           "northeast": {
//             "lat": 2.935696380291502,
//             "lng": 101.6919986302915
//           },
//           "southwest": {
//             "lat": 2.932998419708499,
//             "lng": 101.6893006697085
//           }
//         }
//       },
//       "place_id": "ChIJKX1C6D22zTERTOcM98HnKIs",
//       "types": [
//         "premise"
//       ]
//     }
//   ],
//   "status": "OK"
// }
export async function POST(req) {
  const request = await req.json();

  const { address } = request;

  const googleGeoLocation = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.GOOGLE_API_KEY}`;
  const response = await fetch(googleGeoLocation);
  const json = await response.json();
  return NextResponse.json({
    address: json.results[0].formatted_address,
    latitude: json.results[0].geometry.location.lat,
    longitude: json.results[0].geometry.location.lng,
  });
}
