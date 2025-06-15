import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampaigns } from "../features/campaigns/campaignSlice";
import { Link } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const { campaigns, loading, error } = useSelector(state => state.campaigns);

  useEffect(() => {
    dispatch(fetchCampaigns());
  }, [dispatch]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>All Campaigns</h2>
      {loading && <p style={styles.loading}>Loading...</p>}
      {error && <p style={styles.error}>{error}</p>}
      <div style={styles.cardContainer}>
        {campaigns.map(campaign => (
          <div key={campaign.id} style={styles.card}>
            {campaign.imageUrl && (
              <img src={campaign.imageUrl} alt={campaign.title} style={styles.image} />
            )}
            <h3 style={styles.title}>{campaign.title}</h3>
            <p style={styles.description}>{campaign.description}</p>
            <p style={styles.goal}>Goal: ₹ {campaign.goalAmount}</p>
            <Link to={`/campaign/${campaign.id}`} style={styles.link}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px'
  },
  heading: {
    textAlign: 'center',
    marginBottom: '30px'
  },
  loading: {
    textAlign: 'center',
    color: 'blue'
  },
  error: {
    textAlign: 'center',
    color: 'red'
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center'
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '15px',
    width: '300px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px'
  },
  title: {
    margin: '10px 0',
    fontSize: '1.2rem'
  },
  description: {
    color: '#555',
  },
  goal: {
    fontWeight: 'bold',
    margin: '10px 0'
  },
  link: {
    textDecoration: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '8px 12px',
    borderRadius: '5px',
    display: 'inline-block',
    marginTop: '10px'
  }
};
