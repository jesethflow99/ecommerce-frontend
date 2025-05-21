
import React, { useEffect, useState } from "react";
import "./content.css";
import Service_card from "../../components/cards/Service_card";
import Testimonios from "../../components/cards/testimonios/Testimonios";

const Content = () => {
  const [services, setServices] = useState([]);

    useEffect(() => {
    fetch("/Services.json")
      .then((response) => response.json())
      .then((data) => setServices(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  return (
    <div className="content">
      <h1>Sublimacion</h1>
      <div className="Service_cards">
        {services.map((service,index) => (
          <Service_card
            key={index}
            title={service.title}
            description={service.description}
            image={service.image}
          />
        ))}
        
      </div>
        <Testimonios />
    </div>
  );
};

export default Content;
