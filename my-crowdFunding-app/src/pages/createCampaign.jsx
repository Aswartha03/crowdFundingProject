import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCampaign } from "../features/campaigns/campaignSlice";
import { uploadImage } from "../api/uploadImage";
import { useNavigate, Link } from "react-router-dom";  // <-- Import Link

export default function CreateCampaign() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.campaigns);

  const [form, setForm] = useState({
    title: "",
    description: "",
    goalAmount: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = "";
      if (form.image) {
        imageUrl = await uploadImage(form.image);
      }

      const campaignData = {
        title: form.title,
        description: form.description,
        goalAmount: parseFloat(form.goalAmount),
        imageUrl,
      };

      await dispatch(createCampaign(campaignData)).unwrap();
      alert("Campaign created successfully!");
      setForm({ title: "", description: "", goalAmount: "", image: null });
      navigate("/");
    } catch (err) {
      console.error("Error creating campaign:", err);
      alert(err?.message || "Failed to create campaign. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      {/* 👇 Home Button */}
      <div style={{ textAlign: "right", marginBottom: "10px" }}>
        <Link to="/" style={styles.homeButton}>🏠 Home</Link>
      </div>

      <h2 style={styles.heading}>Create Campaign</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" style={styles.input} required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" style={styles.textarea} required />
        <input name="goalAmount" value={form.goalAmount} onChange={handleChange} placeholder="Goal Amount" type="number" style={styles.input} required />
        <input name="image" type="file" onChange={handleChange} accept="image/*" style={styles.fileInput} />
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Creating..." : "Create Campaign"}
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
}

const styles = {
  container: { maxWidth: "500px", margin: "50px auto", padding: "30px", border: "1px solid #ddd", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", backgroundColor: "#fff" },
  heading: { textAlign: "center", marginBottom: "20px" },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  input: { padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" },
  textarea: { padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc", minHeight: "100px", resize: "vertical" },
  fileInput: { padding: "5px" },
  button: { padding: "10px 20px", fontSize: "16px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" },
  homeButton: { textDecoration: "none", color: "#007bff", fontSize: "16px" },
  error: { color: "red", textAlign: "center" }
};
