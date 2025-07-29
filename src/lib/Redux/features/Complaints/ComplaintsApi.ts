import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ADD_COMPLAINT } from "../../serverapi";

export interface IComplaintsdata {
  text: string;
  phone: string;
  email: string;
  name: string;
  token: string;
}
export const ComplaintsApi = createApi({
  reducerPath: "ComplaintsApi",
  tagTypes: ["Complaints"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://backend.h-platform.online/api",
  }),
  endpoints: (builder) => ({
    addComplaints: builder.mutation({
      query: ({ text, name, phone, email, token }: IComplaintsdata) => ({
        url: ADD_COMPLAINT,
        method: "POST",
        body: { text, name, phone, email },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Complaints"],
    }),
  }),
});

export const { useAddComplaintsMutation } = ComplaintsApi;
