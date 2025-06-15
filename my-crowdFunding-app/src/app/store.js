import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import campaignReducer from "../features/campaigns/campaignSlice";
import donationReducer from "../features/donations/donationSlice";  // add this

export const store = configureStore({
  reducer: {
    auth: authReducer,
    campaigns: campaignReducer,
    donations: donationReducer,
  },
});
