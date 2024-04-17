import React, { useState, useEffect } from "react";
import TableContainer from '@mui/material/TableContainer';
import {
  Box,
  Container,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BidBtn from "./BidBtn";

const AuctionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const AuctionId = location.state?.AuctionId;
  const AuctionTitle = location.state?.AuctionTitle;
  const AuctionBid = location.state?.AuctionBid;
  const AuctionDesc = location.state?.AuctionDesc;
  const EndDate = location.state?.EndDate;

  const [bids, setBids] = useState([]);
  const [auctionBid, setAuctionBid] = useState(AuctionBid);
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const fetchBids = async () => {
      const response = await fetch(
        `https://auctioneer2.azurewebsites.net/bid/p7u/${AuctionId}`
      );
      const data = await response.json();
      setBids(data);
      if (data.length > 0) {
        setAuctionBid(data[data.length - 1].Amount);
      }
    };

    fetchBids();

    const intervalId = setInterval(() => {
      const now = new Date();
      const endDate = new Date(EndDate);
      const timeLeft = endDate - now;

      if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      } else {
        clearInterval(intervalId);
        setCountdown("Auktionen är över");
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [AuctionId, EndDate]);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const deleteAuction = async () => {
    try {
      const response = await fetch(
        `https://auctioneer2.azurewebsites.net/auction/p7u/${AuctionId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            GroupCode: "p7u",
            AuctionID: AuctionId,
          }),
        }
      );

      if (response.ok) {
        alert("Auktion borttagen!");
        navigate("/auktioner");
      } else {
        alert("Något gick fel, försök igen!");
      }
    } catch (error) {
      console.error("Fel uppstod:", error);
    }
  };

  return (
    <Box sx={{ py: 4, bgcolor: "background.default", minHeight: 680 }}>
      <Container sx={{ display: "flex", flexDirection: "column", p: 0 }}>
        <Link
          to="/auktioner"
          style={{ marginBottom: "15px", fontSize: "16px" }}
        >
          Tillbaka till auktioner
        </Link>
        <Typography variant="h2" sx={{ fontSize: "24px" }}>
          {AuctionTitle}
        </Typography>
        <Typography sx={{ pt: 1 }}>{AuctionDesc}</Typography>
        <Typography sx={{ pt: 1, color: "red" }}>{countdown}</Typography>
      </Container>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          mt: 2,
          gap: 2,
          p: 0,
          width: "100%",
        }}
      >
        <Stack direction="column" gap={2}>
          <TableContainer
            component={Paper}
            sx={{ width: 500, height: "fit-content" }}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Bud</TableCell>
                  <TableCell align="right">Namn</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bids.map((bid) => (
                  <TableRow key={bid.id}>
                    <TableCell align="left">{bid.Amount} kr</TableCell>
                    <TableCell align="right">{bid.Bidder}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
        <Container>
          <Stack
            direction="row"
            sx={{
              bgcolor: "lightGrey",
              height: 80,
              pt: 2,
              borderRadius: 2,
              width: 410,
            }}
          >
            <Container sx={{ display: "flex", flexDirection: "column" }}>
              <Typography>Högsta Bud:</Typography>
              <div className="bid-info">
                <Typography variant="h5" component="h2" sx={{ color: "green" }}>
                  {auctionBid} kr
                </Typography>
              </div>
            </Container>
            <Container sx={{ display: "flex", flexDirection: "column" }}>
              <Typography>Avslutas om:</Typography>
              <div className="bid-time">
                <Typography variant="body2" component="p">
                  {countdown}
                </Typography>
              </div>
            </Container>
          </Stack>
          <Stack direction="column" gap={2} sx={{ mt: 2 }}>
            <Box
              component="form"
              display="flex"
              flexDirection="column"
              sx={{ gap: 1, width: 410 }}
            >
              <TextField
                id="outlined-basic"
                label="Bud"
                variant="outlined"
                value={amount}
                onChange={handleAmountChange}
              />
              <TextField
                id="outlined-basic"
                label="Namn"
                variant="outlined"
                value={name}
                onChange={handleNameChange}
              />
            </Box>
            <BidBtn
              AuctionId={AuctionId}
              Amount={amount}
              Bidder={name}
              GroupCode="p7u"
              auctionBid={auctionBid}
              setAuctionBid={setAuctionBid}
            />
            <Button
              style={{ width: "70%" }}
              color="secondary"
              variant="contained"
              onClick={() => deleteAuction()}
            >
              Ta bort
            </Button>
          </Stack>
        </Container>
      </Container>
    </Box>
  );
};

export default AuctionPage;
