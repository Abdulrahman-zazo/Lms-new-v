import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GET_ALL_CURRICULUMS } from "../../serverapi";

export const CurriculumsApi = createApi({
  reducerPath: "CurriculumsApi",
  tagTypes: ["Curriculums"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://backend.h-platform.online/api",
  }),
  endpoints: (builder) => ({
    getAllCurriculums: builder.query({
      query: () => ({
        url: GET_ALL_CURRICULUMS,
      }),
      providesTags: ["Curriculums"],
    }),
  }),
});

export const { useGetAllCurriculumsQuery } = CurriculumsApi;
