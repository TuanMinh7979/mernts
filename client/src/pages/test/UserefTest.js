import React, { useState } from "react";

const Usereftest = () => {
  const [cnt, setCnt] = useState(60);

  let timerId;
  const hdlStart = () => {
    timerId = setInterval(() => {
      setCnt((preCnt) => preCnt - 1);
    }, 1000);
  };

  const hdlStop = () => {
    clearInterval(timerId);
    console.log("stop ", timerId);
  };

  console.log("Instance clg rerender thi chay lai nhung state khong doi");
  return (
    <div style={{ padding: 20 }}>
      <h1>{cnt}</h1>
      <button onClick={hdlStart}>Start</button>
      <button onClick={hdlStop}>Stop</button>
    </div>
  );
};

export default Usereftest;
