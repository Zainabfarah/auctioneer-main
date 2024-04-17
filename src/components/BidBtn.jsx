
import Button from "@mui/material/Button";
import { useState } from "react";

export default function BidBtn({
  AuctionId,
  Amount,
  Bidder,
  auctionBid,
  setAuctionBid,
}) {
  const [submittedAmount, setSubmittedAmount] = useState(null);

  const postBid = async (AuctionId, Amount, Bidder) => {
    const response = await fetch(
      "https://auctioneer2.azurewebsites.net/bid/p7u/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          AuctionID: AuctionId,
          Amount: Amount,
          Bidder: Bidder,
          GroupCode: "p7u",
        }),
      }
    );
    const data = await response.json();
    setAuctionBid(Amount);
  };

  const handleClick = async () => {
    setSubmittedAmount(Amount);
    await postBid(AuctionId, Amount, Bidder);
  };

  return (
    <>
      {submittedAmount && submittedAmount < auctionBid && (
        <div className="errMsg">Du budar för lågt!</div>
      )}
      <Button
        variant="contained"
        color="success"
        sx={{ width: 410, height: 40 }}
        onClick={handleClick}
      >
        Buda
      </Button>
    </>
  );
}
