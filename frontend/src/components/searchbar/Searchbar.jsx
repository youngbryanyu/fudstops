// Searchbar component with filtering (when called, pass in relevant menu data for context)
//
import * as react from "react";
import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";
import Autocomplete /* , {  createFilterOptions  } */ from "@mui/material/Autocomplete";

//freesolo vs combo box?
//only need to search for items with terms in the name matching search term
//need to link chip clickhandl to foodinfo page
//Will take current menu as input, can search filtered items, all items, or dining court's items

//takes curernt menu as input, if on homepage will load all menu items first and then input them
export default function Searchbar(menu) {
  return (
    <Autocomplete
      disablePortal
      id="menu-search-bar"
      options={menu}
      sx={{ width: 0.3 }}
      renderInput={(params) => (
        <TextField {...params} label="Search for an item" />
      )}
    />
  );
}
