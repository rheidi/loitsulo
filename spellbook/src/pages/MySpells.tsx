import { Box, Button, Card, CardActions, CardContent, CardHeader, Collapse, Grid, IconButton, IconButtonProps, Link, Popper, Typography, styled } from '@mui/material'

import React, { useContext } from 'react'
import SpellContext from '../components/SpellContext'
import { Spell } from '../types/Spell'
import SpellCard from '../components/SpellCard'

const MySpells = () => {
  const { selectedSpells, setSelectedSpells } = useContext(SpellContext)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleConfirmPopper = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  };

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popper' : undefined

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant='h1'>My spellbook</Typography>
      {selectedSpells.length === 0 ? (
        <Box>
          <Typography gutterBottom variant='h5'>No spells selected yet</Typography>
          <Link href='/spells'>Get some spells here</Link>
        </Box>
      ) : (
        <Box>
          <Typography variant='h5'>Selected spells.</Typography>
          <Button onClick={handleConfirmPopper}>Clear all</Button>
          <Popper id={id} open={open} anchorEl={anchorEl}>
            <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
              Do you want to remove all selected spells?
              <Button onClick={() => setSelectedSpells([])}>Yes!</Button>
              <Button onClick={() => setAnchorEl(null)}>Not really</Button>
            </Box>
          </Popper>
          <Grid container spacing={2} sx={{pt:1}}>
            {selectedSpells.map((s) => (
              <Grid item key={s.slug} width={300}>
                <SpellCard spell={s}></SpellCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      )
      }
    </Box>
  )
}

export default MySpells
