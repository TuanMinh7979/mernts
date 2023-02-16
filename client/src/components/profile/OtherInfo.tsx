import React from "react";

interface IProps {
  id: string;
}

const OtherInfo: React.FC<IProps> = ({ id }) => {
  return (
    <div>
      <h2>OtherInfo</h2>
    </div>
  );
};

export default OtherInfo;
