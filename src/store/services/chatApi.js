import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    chat: builder.mutation({
      query: ({ messages, location }) => ({
        url: "places",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: messages[0].content,
          data: { location },
        }),
      }),
    }),
  }),
});

export const { useChatMutation } = chatApi;
