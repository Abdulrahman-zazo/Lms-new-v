import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  DELETE_COMMINTS,
  GET_ALL_COURSES,
  GET_COURSE_BY_ID,
} from "../../serverapi";
import type { IDeleteComment } from "../Comments/CommentsApi";

export const CoursesApi = createApi({
  reducerPath: "CoursesApi",
  tagTypes: ["Courses"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://backend.h-platform.online/api",
  }),
  endpoints: (builder) => ({
    getAllCourses: builder.query({
      query: () => ({
        url: GET_ALL_COURSES,
      }),
      providesTags: ["Courses"],
    }),
    getCourseById: builder.query({
      query: (course_id: string) => ({
        url: GET_COURSE_BY_ID,
        method: "POST",
        body: { course_id },
      }),
      providesTags: ["Courses"],
    }),
    deleteComments: builder.mutation({
      query: ({ comment_id, token }: IDeleteComment) => ({
        url: DELETE_COMMINTS,
        method: "POST",
        body: { comment_id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Courses"],
    }),
  }),
});

export const {
  useGetCourseByIdQuery,
  useGetAllCoursesQuery,
  useDeleteCommentsMutation,
} = CoursesApi;
