import { configureStore } from "@reduxjs/toolkit";
import networkReducer from "../features/networkSlice";
import pageRouteReducer from "../features/pageRouteSlice";
import transactionReducer from "../features/transactionSlice";
import rampingReducer from "../features/rampingSlice";
import { transactionApi } from "../services/transactionApi";

const store = configureStore({
  reducer: {
    [transactionApi.reducerPath]: transactionApi.reducer,
    network: networkReducer,
    pageRoute: pageRouteReducer,
    transaction: transactionReducer,
    ramping: rampingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: true }).concat(transactionApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
