import React, { useEffect, useState } from "react";
import AuctionCard from "./AuctionCard";
import { Box, Grid } from "@mui/material";

const Auctions = () => {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      const response = await fetch(
        "https://auctioneer2.azurewebsites.net/auction/p7u"
      );
      const data = await response.json();
      const now = new Date();

     
      const activeAuctions = data.filter(auction => new Date(auction.EndDate) > now);
      setAuctions(activeAuctions);
    };

    fetchAuctions();
  }, []);


  const addAuction = (newAuction) => {
    setAuctions((prevAuctions) => [...prevAuctions, newAuction]);
  };

  return (
    <Box sx={{ p: 2, minHeight: 680 }}>
      <Grid
        container
        spacing={1}
        gap={2}
        className="auctions"
        sx={{ width: "100%" }}
      >
        {auctions.map((auction) => (
          <Grid item key={auction.AuctionID}>
            <AuctionCard
              AuctionId={auction.AuctionID}
              AuctionTitle={auction.Title}
              AuctionDesc={auction.Description}
              AuctionBid={auction.StartingPrice}
              EndDate={auction.EndDate}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Auctions;
