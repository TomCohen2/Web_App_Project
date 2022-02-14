import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import "./ViewAds.css";
import { useLocation } from "react-router-dom";
import socketClient from "socket.io-client";
import Welcome from "./Welcome";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const SERVER = "http://localhost:8000/";

function Headline(props) {
  return (
    <>
      <div className="head__line">
        <div className="line">
          <div className="dot dot1"></div>
          <div className="dot dot2"></div>
          <div className="dot dot3"></div>
          <div className="dot dot4"></div>
          <div className="dot dot5"></div>
        </div>
        <br />
        <p>{`Screen #${props.screen}`}</p>
        <p>{`status: ${
          props.data ? "connected" : "trying to connect the server..."
        }`}</p>
        {/* <p>{`bool: ${props.data}`}</p> */}
        <br />
        <br />
      </div>
    </>
  );
}

function ViewAds() {
  const [data, setData] = useState(null);
  const [num, setNum] = useState(0);
  const [dataShown, setdataShown] = useState(null);
  let location = useLocation();
  var socket = socketClient(SERVER);
  const [amount, setAmount] = useState(0);
  const [screenArr, setScreenArr] = useState([]);
  const [duration, setDuration] = useState([]);
  let timer = null;
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/ad")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  socket.on("clients", (amount, array) => {
    // console.log(amount + " " + array);
    setAmount(amount);
    setScreenArr(array);
    console.log(array);
  });

  useEffect(() => {
    // console.log(location.pathname);

    socket.emit("screenConnect", location.pathname);
  }, [location.pathname]);

  let relevantAds = [];
  const { id } = useParams();
  if (data) {
    relevantAds = data.filter((a) => a.screens.includes(id % 4));
  }

  useEffect(() => {
    let length = 0;
    if (dataShown) {
      timer = parseInt(dataShown.duration);
      console.log(timer);
      console.log(duration);
    }

    // console.log(relevantAds[(num - 1) % relevantAds.length]);
    // console.log(relevantAds);
    setTimeout(
      () => {
        if (data) {
          length = relevantAds.length;
          setDuration(relevantAds[num % length].duration);
          // console.log("CURRENT DURATION: " + dataShown ? duration : 3000);
        } else {
          length = 3;
        }

        setNum((num + 1) % length);
        setdataShown(relevantAds[num]);
      },
      dataShown ? duration : 3000
    );
  }, [num]);

  return (
    <>
      <div className="App">
        <Headline screen={id} data={dataShown ? true : false} />
        <header className="App-header">
          {/* <h4>{`Screen #${id}`}</h4>
          <h4>
            {!dataShown
              ? "Loading duration of first ad..."
              : ` duration: ${dataShown.duration}`}
          </h4> */}
          <h1>{!dataShown ? "Loading ad title..." : `${dataShown.name}`} </h1>
          <p>
            {!dataShown ? "Loading description..." : `${dataShown.description}`}
          </p>
          <img
            className="photo"
            src={!dataShown ? null : `${dataShown.image}`}
          />
        </header>

        {/* <CountdownCircleTimer
          isPlaying
          duration={duration / 1000}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[7, 5, 2, 0]}
        >
          {({ remainingTime }) => remainingTime}
        </CountdownCircleTimer> */}
      </div>
    </>
  );
}

export default ViewAds;
