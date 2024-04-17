import Picture6 from "../assets/Picture6.jpg";

function Homepage() {
  return (
    <>
      <div className="Header">
        <img className="main-card-img" src={Picture6} alt="Picture6"></img>
        <h1 className="centered"> Välkommen till Auctioneer</h1>
        <p className="text">
          {" "}
          Välkommen till Auctioneer. Vi arbetar med online auktioner. På vår
          hemsida kan du delta på budgivningar.
          <br></br>
          <p className="info"> Information </p>
          <p>
            <li>
              Man kan lägga bud på öppna auktioner men budet måste vara högre än
            </li>
            det tidigare högsta budet.
            <li>Det går att söka på auktioner, även på avslutade auktioner.</li>
          </p>
        </p>
      </div>
    </>
  );
}

export default Homepage;
