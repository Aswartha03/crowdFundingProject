import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDonation } from "../features/donations/donationSlice";

export default function DonationForm({ campaignId }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: "", amount: "" });
  const { loading, error } = useSelector(state => state.donations);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addDonation({ campaignId, donation: form }));
    setForm({ name: "", amount: "" });
  };

  return (
    <div>
      <h4>Make a Donation</h4>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" />
        <input name="amount" value={form.amount} onChange={handleChange} placeholder="Amount" type="number" />
        <button type="submit" disabled={loading}>Donate</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
