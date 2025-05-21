import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Avatar from "@mui/material/Avatar";
import "./testimonios.css";

const Testimonios = () => {
  const [testimonios, setTestimonios] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null); // si lo necesitas

  useEffect(() => {
    fetch("./testimonios.json")
      .then((response) => response.json())
      .then((data) => setTestimonios(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="testimonios">
      <h1>Testimonios de nuestros clientes</h1> <br />
      <div className="testimonios_cards">
        {testimonios.map((testimonio, index) => (
          <Card key={testimonio.id} sx={{ margin: "1rem", width: "300px" }}>
            <CardActionArea
              onClick={() => setSelectedCard(index)}
              data-active={selectedCard === index ? "" : undefined}
              sx={{
                "&[data-active]": {
                  backgroundColor: "action.selected",
                  "&:hover": {
                    backgroundColor: "action.selectedHover",
                  },
                },
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  <Avatar>{testimonio.title[0]}</Avatar>
                </div>

                <Typography variant="h5" component="div">
                  {testimonio.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {testimonio.description}
                </Typography>

                <div className="estrellas">
                  {Array(testimonio.stars)
                    .fill()
                    .map((_, i) => (
                      <Typography
                        key={i}
                        variant="body2"
                        color="#F5B515"
                        component="span"
                      >
                        <i className="ri-star-fill"></i>
                      </Typography>
                    ))}
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Testimonios;
