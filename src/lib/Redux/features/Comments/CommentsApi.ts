import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ADD_COMMINTS } from "../../serverapi";

export interface ICommentsdata {
  course_id: number;
  comment_text: string;
  token: string;
  comment_id?: number;
}

export interface IDeleteComment {
  comment_id: number;
  token: string;
}
export const CommentsApi = createApi({
  reducerPath: "CommentsApi",
  tagTypes: ["Comments"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://backend.h-platform.online/api",
  }),
  endpoints: (builder) => ({
    addComments: builder.mutation({
      query: ({ course_id, comment_text, token }: ICommentsdata) => ({
        url: ADD_COMMINTS,
        method: "POST",
        body: { course_id, comment_text },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const { useAddCommentsMutation } = CommentsApi;
