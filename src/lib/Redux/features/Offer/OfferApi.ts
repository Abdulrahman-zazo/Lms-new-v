import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GET_ALL_OFFERS } from "../../serverapi";

export const OfferApi = createApi({
  reducerPath: "OfferApi",
  tagTypes: ["Offer"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://backend.h-platform.online/api",
  }),
  endpoints: (builder) => ({
    getAllOffer: builder.query({
      query: () => ({
        url: GET_ALL_OFFERS,
      }),
      providesTags: ["Offer"],
    }),
  }),
});

export const { useGetAllOfferQuery } = OfferApi;
