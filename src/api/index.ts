import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

// export const url = "http://localhost:4500/api";
export const url = "https://stingray-stellar-2ay7e.ondigitalocean.app/api";

// export const url2 = "http://localhost:8000/sep24";
export const url2 = "https://anchor.ngnc.online/sep24";

export const stellarFees = "https://api.ngnc.online/live/v1/stellar-fees";

export const baseQuery = fetchBaseQuery({
  baseUrl: url,
  credentials: "include",
  // prepareHeaders: (headers, { getState }: any) => {
  //   const secKey = getState().launch.secKey;
  //   if (!secKey) {
  //     headers.set("ngnc-sec-key", secKey);
  //   }
  //   return headers;
  // },
});
