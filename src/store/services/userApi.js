import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => '/users',
      transformResponse: (response) => {
        if (response?.favorites) {
          response.favorites = response.favorites.reverse();
        }
        return response;
      },
    }),
  }),
});

export const { useGetUserQuery } = userApi;
