import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';

const CreateAuctionForm = ({ addAuction }) => {
  const [auctionTitle, setAuctionTitle] = useState('');
  const [auctionDescription, setAuctionDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const newAuction = {
        Title: auctionTitle,
        Description: auctionDescription,
        StartDate: startDate,
        EndDate: endDate,
        GroupCode: 'p7u',
        StartingPrice: 500,
        CreatedBy: 'Grupp 7'
      };

      await fetch('https://auctioneer2.azurewebsites.net/auction/p7u', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAuction)
      });

      addAuction(newAuction);

      setAuctionTitle('');
      setAuctionDescription('');
      setStartDate('');
      setEndDate('');
    } catch (error) {
      console.error('Fel uppstod:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="Title"
        label="Titel"
        value={auctionTitle}
        onChange={(e) => setAuctionTitle(e.target.value)}
      />
      <TextField
        name="Description"
        label="Beskrivning"
        value={auctionDescription}
        onChange={(e) => setAuctionDescription(e.target.value)}
        multiline
        rows={4}
      />
      <div label htmlFor="StartDate">
        Start Date
      </div>
      <input
        type="datetime-local"
        value={startDate}
        onChange={(e)=> setStartDate(e.target.value)}
      />
      <div label htmlFor="EndDate">
        End Date
      </div>
      <input 
        type="datetime-local"
        value={endDate}
        onChange={(e)=> setEndDate(e.target.value)}
      /> 
      <Button type="submit" color="primary" variant="contained">
        Skapa Auktion
      </Button>
    </form>
  );
};

const ParentComponent = () => {
  const [auctions, setAuctions] = useState([]);


  const addAuction = (newAuction) => {
    setAuctions(prevAuctions => [...prevAuctions, newAuction]);
  };

  const deleteAuction = async (auction) => {
    try {
      await fetch(`https://auctioneer2.azurewebsites.net/auction/p7u/${auction.AuctionID}`, {
        method: 'DELETE',
        body: JSON.stringify({
          GroupCode: 'p7u',
          AuctionID: auction.AuctionID
        })
      });
      const updatedAuctions = auctions.filter(auct => auct.AuctionID !== auction.AuctionID)
      setAuctions(updatedAuctions);
    } catch (error) {
      console.error('Fel uppstod:', error);
    }
  };

  return (
    <div>
      <h1>Skapa en ny auktion</h1>
      <CreateAuctionForm addAuction={addAuction} />
    </div>
  );
};

export default ParentComponent;

