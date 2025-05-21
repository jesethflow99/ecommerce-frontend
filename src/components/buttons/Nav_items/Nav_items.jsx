import React from "react";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import "./nav_items.css";

const Nav_items = () => {
  return (
    <div className="nav_items">
      <div className="mail">
        <Badge badgeContent={4} color="primary" sx={{ fontSize: 30 }}>
          <i class="ri-mail-line"></i>
        </Badge>
      </div>
      <div className="cart">
        <Badge badgeContent={4} color="primary" sx={{ fontSize: 30 }}>
          <i class="ri-shopping-cart-line"></i>
        </Badge>
      </div>
      <div className="user">
        <Avatar sx={{ backgroundColor: "var(--color-primary)" }}>H</Avatar>
      </div>
    </div>
  );
};

export default Nav_items;
