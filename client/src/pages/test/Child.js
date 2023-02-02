import React from "react";
import  { useSelector } from "react-redux"
const Child = ({ setParentHome }) => {
  let { categories } = useSelector((state) => state);
  console.log("Child instance method " + categories);
  const setCat = () => {
    console.log("IN FUNCION NOT RERENDER")
    categories = "catnew " + Math.floor(Math.random() * 100);
    console.log(categories)
  };
  return (
    <div style={{ width: "300px", height: "300px", backgroundColor: "orange" }}>
      <h6>Child</h6>
      <button
        onClick={() =>
          setParentHome("homenew " + Math.floor(Math.random() * 100))
        }
      >
        rerender
      </button>
      <button onClick={() => setCat()}>setCat selector</button>
    </div>
  );
};

export default Child;
