// apiSlice.ts أو contactApi.ts
import { Contact } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GET_CONTACTS } from "../../serverapi";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://backend.h-platform.online/api",
  }),
  endpoints: (builder) => ({
    getContact: builder.query<{ Contact: Contact[] }, void>({
      query: () => ({
        url: GET_CONTACTS,
      }),
    }),
  }),
});

export const { useGetContactQuery } = contactApi;
