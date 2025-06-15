import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../api/firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

export const addDonation = createAsyncThunk(
  "donations/addDonation",
  async ({ campaignId, donation }) => {
    const donationRef = collection(db, "campaigns", campaignId, "donations");
    const docRef = await addDoc(donationRef, donation);
    return { id: docRef.id, ...donation, campaignId };
  }
);

const donationSlice = createSlice({
  name: "donations",
  initialState: {
    donations: [],
    loading: false,
    error: null,
  },
  reducers: {
    setDonations: (state, action) => {
      state.donations = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addDonation.pending, (state) => {
        state.loading = true;
      })
      .addCase(addDonation.fulfilled, (state, action) => {
        state.loading = false;
        state.donations.push(action.payload);
      })
      .addCase(addDonation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setDonations } = donationSlice.actions;
export default donationSlice.reducer;
