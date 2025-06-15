import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCampaigns } from "../features/campaigns/campaignSlice";
import { db } from "../api/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { setDonations } from "../features/donations/donationSlice";
import DonationForm from "../components/DonationForm";

export default function CampaignDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { campaigns } = useSelector(state => state.campaigns);
  const { donations } = useSelector(state => state.donations);
  const campaign = campaigns.find(c => c.id === id);

  useEffect(() => {
    if (campaigns.length === 0) {
      dispatch(fetchCampaigns());
    }
  }, [dispatch, campaigns.length]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "campaigns", id, "donations"),
      (snapshot) => {
        const donationList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(setDonations(donationList));
      }
    );
    return () => unsubscribe();
  }, [dispatch, id]);

  if (!campaign) return <p>Loading campaign...</p>;

  const totalRaised = donations.reduce((sum, d) => sum + Number(d.amount), 0);
  const progress = Math.min((totalRaised / campaign.goalAmount) * 100, 100).toFixed(2);

  return (
    <div>
      <h3>Details</h3>
      <h2>{campaign.title}</h2>
      <img src={campaign.imageUrl} alt={campaign.title} width="400" />
      <p>{campaign.description}</p>
      <p>Goal: ₹ {campaign.goalAmount}</p>

      <div style={{ backgroundColor: "#eee", height: "30px", borderRadius: "5px", marginBottom: "10px" }}>
        <div style={{
          width: `${progress}%`,
          height: "100%",
          backgroundColor: "#4caf50",
          borderRadius: "5px",
          textAlign: "center",
          color: "white",
          fontWeight: "bold"
        }}>
          {progress}%
        </div>
      </div>

      <p>Total Raised: ₹ {totalRaised}</p>

      <DonationForm campaignId={id} />

      <h3>Recent Donations:</h3>
      {donations.map(d => (
        <div key={d.id}>
          <p>{d.name} donated ₹ {d.amount}</p>
        </div>
      ))}
    </div>
  );
}
