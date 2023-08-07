import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { Card } from "@mui/material";
const LoadingCard = ({count}) => {
  const loopcard = () => {
    let cards = [];
    for (let i =0; i< count;i++){
      cards.push(<Card className="col-md-4 m-2">
     <Skeleton  variant="rounded"  height={260} />
    </Card>)
  }
  return cards
  };
  return (
    <>
      <div className="row pb-5">
        {loopcard()}
      </div>
    </>
  );
};

export default LoadingCard;
