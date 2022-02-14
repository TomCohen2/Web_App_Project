import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./ShowAllAds.css";
import { useParams } from "react-router-dom";
import MediaCard from "./MediaCard";
import Button from "@mui/material/Button";

// function AdCard({ ad }) {
//   const { _id, name, description, image, screens } = ad;
//   const params = useParams();

//   return (
//     <div className="card" key={_id}>
//       <div className="name-description">
//         <h3>{name}</h3>
//         <p>{description}</p>
//         <p>{`Presented on Screens: ${screens}`}</p>
//         <img src={image} width="100px" />
//       </div>

//       <div className="button-container">
//         <a href={`/edit-ad/${_id}`}>
//           <button>Edit</button>
//         </a>
//         <button name={_id} title={name} onClick={handleDelete}>
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// }

// function handleDelete(e) {
//   console.log("clicked");
//   if (window.confirm(`Are you sure you want to delete ${e.target.title}?`)) {
//     axios.delete(`http://localhost:8000/api/ad/${e.target.name}`);
//   } else {
//     console.log();
//   }

//   console.log(e.target.name);
// }

function ShowAllAds() {
  const [ads, setAds] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/ad")
      .then((res) => {
        setAds(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let list = ads.map((ad) => {
    <div>{ad.name}</div>;
  });
  console.log(ads);

  return (
    <section className="container">
      <section className="contents">
        <div className="btnDiv">
          <Button
            className="btn"
            size="large"
            href="/screen=0"
            color="secondary"
            variant="contained"
          >
            Back To Admin Screen
          </Button>
          <Button
            className="btn"
            size="large"
            href="/create-ad"
            color="secondary"
            variant="contained"
          >
            Create new Ad
          </Button>
        </div>

        <div className="page">
          {ads.map((ad, index) => (
            <MediaCard key={index} ad={ad} />
          ))}
        </div>
      </section>
    </section>
  );
}

export default ShowAllAds;
