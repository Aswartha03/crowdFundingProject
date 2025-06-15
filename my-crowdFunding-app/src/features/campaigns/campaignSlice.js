import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db, auth, serverTimestamp } from "../../api/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const createCampaign = createAsyncThunk(
  "campaigns/createCampaign",
  async (campaignData) => {
    const user = auth.currentUser;
    const dataWithUser = {
      ...campaignData,
      userId: user ? user.uid : null,
      createdAt: serverTimestamp(),
    };
    const docRef = await addDoc(collection(db, "campaigns"), dataWithUser);
    return { id: docRef.id, ...dataWithUser };
  }
);

export const fetchCampaigns = createAsyncThunk(
  "campaigns/fetchCampaigns",
  async () => {
    const querySnapshot = await getDocs(collection(db, "campaigns"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
);

const campaignSlice = createSlice({
  name: "campaigns",
  initialState: {
    campaigns: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCampaign.pending, (state) => { state.loading = true; })
      .addCase(createCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.campaigns.push(action.payload);
      })
      .addCase(createCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCampaigns.pending, (state) => { state.loading = true; })
      .addCase(fetchCampaigns.fulfilled, (state, action) => {
        state.loading = false;
        state.campaigns = action.payload;
      })
      .addCase(fetchCampaigns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default campaignSlice.reducer;
