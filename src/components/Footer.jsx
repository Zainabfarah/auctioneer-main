import { Box, Typography, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box height={150} sx={{ bgcolor: "lightGrey", px:0, marginLeft:0 }}>
      <Container maxWidth='false' sx={{ display: "flex", flexDirection: "row", gap:2, p:1 , justifyContent:'space-between'}}>
        <Typography sx={{pt:2, fontSize:22}} variant="h2">&copy; Auctioneer {new Date().getFullYear()}</Typography>
        <Stack gap={3} direction={'row'} sx={{paddingRight:5, pt:2}}>
        <Link to="https://github.com/sarahthebest/auctioneer" target="_blank">Github</Link>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
