import React, { MutableRefObject } from "react";
import "./CountDown.css";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

const CountDown = (props: any) => {
  
  const [timerDays, setTimerDays] = useState<any>("00");
  const [timerHours, setTimerHours] = useState<any>("00");
  const [timerMinutes, setTimerMinutes] = useState<any>("00");
  const [timerSeconds, setTimerSeconds] = useState<any>("00");
  let interval: any = useRef(null);
  const startTimer = () => {
    // 'November 01, 2023 00:00:00'
    const countdownDate = new Date(props.exp * 1000).getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval?.current!);
      } else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval?.current!);
    };
  });
  return (
    <section className="timer">
      <h3 style={{ textAlign: "center" }}>Access Token Time</h3>
      <div>
        <section>
          <p>{timerDays}</p>
          <p>
            <small>Days</small>
          </p>
        </section>
        <span>:</span>
        <section>
          <p>{timerHours}</p>
          <p>
            <small>Hours</small>
          </p>
        </section>
        <span>:</span>
        <section>
          <p>{timerMinutes}</p>
          <p>
            <small>Minutes</small>
          </p>
        </section>
        <span>:</span>
        <section>
          <p>{timerSeconds}</p>
          <p>
            <small>Seconds</small>
          </p>
        </section>
      </div>
    </section>
  );
};

export default CountDown;
