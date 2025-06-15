import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../api/firebase";
import { Link } from "react-router-dom";

export default function Profile() {
  const [userCampaigns, setUserCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserCampaigns = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const q = query(collection(db, "campaigns"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const campaigns = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserCampaigns(campaigns);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCampaigns();
  }, []);

  const containerStyle = {
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    backgroundColor: '#f7f9fc',
    minHeight: '100vh',
    padding: '20px'
  };

  const headerStyle = {
    textAlign: 'center',
    color: '#222',
    marginBottom: '20px'
  };

  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    margin: "20px auto",
    padding: "20px",
    maxWidth: "500px",
    background: "#fff"
  };

  const imgStyle = {
    width: "100%",
    borderRadius: "8px"
  };

  const linkStyle = {
    color: "#007bff",
    textDecoration: "none"
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>My Campaigns</h2>
      {userCampaigns.length === 0 ? (
        <p style={{ textAlign: 'center' }}>You haven't created any campaigns yet.</p>
      ) : (
        userCampaigns.map(campaign => (
          <div key={campaign.id} style={cardStyle}>
            {campaign.imageUrl && <img src={campaign.imageUrl} alt={campaign.title} style={imgStyle} />}
            <h3>{campaign.title}</h3>
            <p>{campaign.description}</p>
            <p>Goal: ₹ {campaign.goalAmount}</p>
            <Link to={`/campaign/${campaign.id}`} style={linkStyle}>View Details</Link>
          </div>
        ))
      )}
    </div>
  );
}
