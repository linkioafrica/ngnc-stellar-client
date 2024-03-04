import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../api";

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery,
  endpoints: (builder) => ({
    buyRamp: builder.mutation({
      query: (credentials) => ({
        url: "/stellar/deposit",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    sellRamp: builder.mutation({
      query: (credentials) => ({
        url: "stellar/withdraw",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    customerKYC: builder.query({
      query: (credentials) => ({
        url: "/transaction/customer-kyc",
        method: "GET",
        body: { ...credentials },
      }),
    }),
    businessKYB: builder.mutation({
      query: (credentials) => ({
        url: "/business/request-kyb",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const {
  useBuyRampMutation,
  useSellRampMutation,
  useCustomerKYCQuery,
  useBusinessKYBMutation,
} = transactionApi;
