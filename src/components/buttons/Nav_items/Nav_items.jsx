import React from "react";
import Avatar from "@mui/material/Avatar";
import "./nav_items.css";
import CartModal from "../../CartModal";

const Nav_items = () => {
  const userData = JSON.parse(localStorage.getItem('me'));

  const name = userData.username
  return (
    <div className="nav_items">
      
      <div className="cart">
        <CartModal/>
      </div>
      <div className="user">
        <Avatar sx={{ backgroundColor: "var(--color-primary)" }}>{name[0]}</Avatar>
        {console.log(name)}
      </div>
    </div>
  );
};

export default Nav_items;
