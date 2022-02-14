import React from "react";
import "./CreateAd.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

function CreateAd(props) {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    description: "",
    image: "",
    screens: "",
    duration: "",
  });

  function handleChange(e) {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const ad = {
      name: data.name,
      description: data.description,
      image: data.image,
      screens: data.screens,
      duration: data.duration,
    };
    axios
      .post(`http://localhost:8000/api/ad/`, ad)
      .then((res) => {
        setData({
          name: "",
          description: "",
          image: "",
          screens: "",
          duration: "",
        });
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log("Error couldn't create Ad");
        console.log(err.message);
      });

    setTimeout(() => {
      navigate("/allads");
    }, 1500);
  }

  return (
    <div className="creat__page">
      <div>
        <Button
          className="btn"
          size="large"
          href="/screen=0"
          color="secondary"
          variant="contained"
        >
          Back To Admin Screen
        </Button>
        <h1>Create Ad Form ➔</h1>
      </div>
      <form>
        <label>Title</label>
        <input
          name="name"
          type="text"
          min="2"
          onChange={handleChange}
          required
        />
        <label>Description</label>
        <input
          name="description"
          type="text"
          required
          onChange={handleChange}
        />
        <label>Image URL</label>
        <input name="image" type="url" required onChange={handleChange} />
        <label>Screens</label>
        <input name="screens" type="text" required onChange={handleChange} />
        <label>Duration</label>

        <input name="duration" type="number" required onChange={handleChange} />
        <Button type="submit" className="btn" onClick={handleSubmit}>
          Send
        </Button>
      </form>
    </div>
  );
}

export default CreateAd;
