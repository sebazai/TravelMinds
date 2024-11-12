/* eslint-disable indent */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const placesApi = createApi({
  reducerPath: 'placesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    places: builder.mutation({
      query: ({ prompt, location, position }) => ({
        url: 'places',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          data: { location, position },
        }),
      }),
    }),
    placesChat: builder.mutation({
      query: ({ messages, location, position }) => ({
        url: 'places/chat',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages,
          data: { location, position },
        }),
      }),
      transformResponse: (response) => {
        console.log('Response:', response);
        if (!response?.googleData?.candidates) return response;

        console.log('We have some Google candidates');
        if (response.googleData.candidates) {
          const answer =
            response?.googleData?.status !== 'ZERO_RESULTS'
              ? [
                  {
                    role: 'assistant',
                    content: [
                      {
                        type: 'text',
                        text: 'Here you go, they are on the map.',
                      },
                    ],
                  },
                ]
              : [
                  {
                    role: 'assistant',
                    content: [
                      {
                        type: 'text',
                        text: 'Please provide more information, I found zero results.',
                      },
                    ],
                  },
                ];
          const placesMappedResult = response.googleData.candidates.map(
            (place) => {
              return {
                name: place.name,
                address: place.formatted_address,
                justification: '',
                coordinates: {
                  latitude: place.geometry.location.lat,
                  longitude: place.geometry.location.lng,
                },
              };
            },
          );
          // Swap the last response.messages item with answer if we have candidates
          const newMessages = response.messages.slice(0, -1);
          newMessages.push(...answer);
          return { messages: newMessages, places: placesMappedResult };
        }

        //   setMessages((currentMessages) => [
        //     ...currentMessages,
        //     ...(rest?.googleData?.candidates ? answer : newMessages),
        //   ]);
        //   return {
        //     messages: [],
        //     googleData: {
        //       candidates: [],
        //     },
        //   };
        // },
      },
    }),
  }),
});

export const { usePlacesMutation, usePlacesChatMutation } = placesApi;
