import { AppBar, Box, Button, Toolbar } from "@mui/material"
import React from "react"

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button href="/">Home</Button>
          <Button href="/spells">All spells</Button>
          <Button href="/myspells">My spellbook</Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
