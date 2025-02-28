import { api } from "./api";
import { FormData, LoginData } from "../utils/types";

export const injectEnpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<{
      token: string;
      /*user: {
        id: string;
        firstName: string;
        lastName: string;
        role: string;
      }*/
    }, LoginData>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
    }),
    // list: builder.mutation<
    //   {
    //     code: string,
    //     data: FormData[]
    //   },
    //   void
    // >({
    //   query: (body) => ({
    //     url: "http://localhost:8080/comerciante/lista?page=0&size=1",
    //     method: "POST",
    //     body,
    //   }),
    // }),
    list: builder.query<
      {
        content: FormData[];
        totalPages: number;
        totalElements: number;
        number: number;
        size: number;
      },
      { page: number; size: number }
    >({
      query: ({ page, size }) => ({
        url: `comerciante/lista?page=${page}&size=${size}`,
        method: "GET",
      }),
    }),
    form: builder.mutation<void, FormData>({
      query: (body) => ({
        url: "comerciante/create",
        method: "POST",
        body,
      }),
    }),
  })
})

export const {
  useLoginMutation,
  useListQuery,
  useFormMutation,
} = injectEnpoints;