import React from "react";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";

const Nav_items = () => {
  return (
    <div className="nav_items" style={{ display: "flex", gap: "20px", height: "100%", alignItems: "center" }}>
      <Badge badgeContent={4} color="primary" sx={{ fontSize: 30 }}>
        <i class="ri-mail-line"></i>
      </Badge>
      <Badge badgeContent={4} color="primary" sx={{ fontSize: 30 }}>
        <i class="ri-shopping-cart-line"></i>
      </Badge>
      <Avatar sx={{ backgroundColor: "var(--color-primary)" }}>H</Avatar>
    </div>
  );
};

export default Nav_items;
