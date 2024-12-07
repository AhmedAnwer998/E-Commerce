import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { HiBars3 } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useTheme } from "../ThemeContext/ThemeContext";

const SideBarCategory = () => {
  const [open, setOpen] = useState(false);
  const {isDarkMode} = useTheme();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = () => (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <h4 className="mx-3">Trending</h4>
      <List>
        {["Best Selling", "Top Rated", "Brands"].map((text) => (
          <ListItem key={text} disablePadding className="px-2">
            <ListItemButton className="mx-1 !rounded-md">
              <ListItemText
                className="!text-black hover:!text-amber-500 no-underline hover:scale-95 transition duration-800 "
                primary={text}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <h4 className="mx-3">Shop Categories</h4>

      <List>
        {[
          { label: "Men's Clothes", to: "/MenClothing" },
          { label: "Jewelery", to: "/Jewelery" },
          { label: "Electronics", to: "/Electronics" },
          { label: "Women's Clothes", to: "/WomenClothes" },
        ].map(({ label, to }) => (
          <ListItem key={label} disablePadding className="px-2">
            <ListItemButton className="mx-1 !rounded-md">
              <Link
                className="!text-black hover:!text-amber-500 no-underline hover:scale-95 transition duration-800 "
                to={to}
              >
                {label}
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <button className="flex align-middle" onClick={toggleDrawer(true)}>
        {" "}
        <HiBars3 className={`text-2xl ${isDarkMode ? "text-white" : "text-black"} !text-black font-bold cursor-pointer hover:!text-white hover:scale-95 duration-1000 transition-all`} />
      </button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {<DrawerList />}
      </Drawer>
    </div>
  );
};

export default SideBarCategory;
