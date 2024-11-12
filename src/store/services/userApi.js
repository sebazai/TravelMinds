import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => id ? `/users/${id}` : 'users/',
    }),
  }),
});

export const { useGetUserQuery } = userApi;
