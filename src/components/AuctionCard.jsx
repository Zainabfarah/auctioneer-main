import { Box, Card, CardContent, Typography, Paper, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";

const AuctionCard = ({
  AuctionId,
  AuctionTitle,
  AuctionDesc,
  AuctionBid,
  EndDate,
}) => {

  const date = new Date (EndDate)

  return (
    <Box sx={{ width: 220, height: "fit-content", position: "relative" }}>
      <Link
        to="/AuctionPage"
        state={{
          AuctionId: AuctionId,
          AuctionTitle: AuctionTitle,
          AuctionDesc: AuctionDesc,
          AuctionBid: AuctionBid,
          EndDate: EndDate,
        }}
      >
        <Paper elevation={1}>
          <Card variant="outlined" sx={{ height: 250 }}>
            <CardContent>
              <Grid
                container
                direction="column"
                justifyContent="space-between"
                sx={{ height: "100%" }}
              >
                <Grid item>
                  <Typography sx={{ fontSize: 16 }} gutterBottom>
                    {AuctionTitle}
                  </Typography>
                  <Typography
                    sx={{ my: 2, color: "green", fontSize:20 }}
                    variant="h5"
                    component="div"
                  >
                    Startpris: {AuctionBid}
                  </Typography>
                  <Typography color="text.secondary">{AuctionDesc}</Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ position: "absolute", bottom: 0, pb: 2 }}
                  >
                  {
                   
                   (date.getFullYear()) +  "-" +
                   (date.getMonth() + 1 < 10 ? "0" +(date.getMonth() + 1) : date.getMonth() + 1) +"-" + 
                   (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + "-" +
                   (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":" +
                   (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":" +
                   (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds())
                    
                    }
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Paper>
      </Link>
    </Box>
  );
};

export default AuctionCard;