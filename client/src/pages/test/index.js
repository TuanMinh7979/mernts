import React ,{useState} from "react";
import Child from "./Child";

const Parent = () => {
  const [home, setHome] = useState("init Home");

  console.log("Parent instance method");
  return <div  style={{width: "500px", height: "500px", backgroundColor:"cyan"}}><h2>parent</h2>
  <p>Homevalue: {home}</p>
  <Child setParentHome={setHome}></Child>
  </div>;
};

export default Parent;
