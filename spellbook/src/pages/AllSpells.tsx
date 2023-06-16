import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Checkbox, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React, { Dispatch, SetStateAction, useContext, useState } from 'react'
import { useGetSpellsList } from '../components/getSpells'
import { Spell } from '../types/Spell'
import SpellContext from '../components/SpellContext'
import { SpellInfo } from '../components/SpellInfo';

const AllSpells = () => {
  const spellsRes = useGetSpellsList('https://api.open5e.com/spells/?limit=100')
  var spells = spellsRes?.results
  const { selectedSpells, setSelectedSpells } = useContext(SpellContext)

  const handleToggle = (s: Spell) => () => {
    setSelectedSpells((prevSelectedSpells) => {
      const isSelected = prevSelectedSpells.some((spell) => spell.slug === s.slug)
      let newSelectedSpells: Spell[]

      if (isSelected) {
        newSelectedSpells = prevSelectedSpells.filter((spell) => spell.slug !== s.slug)
      } else {
        newSelectedSpells = [...prevSelectedSpells, s]
      }

      return newSelectedSpells
    })
  }
  const [open, setOpen] = useState(false)
  const [activeSpell, setActiveSpell] = useState<Spell>()

  const handleClickOpen = (s: Spell) => () => {
    setActiveSpell(s)
    setOpen(true)
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant='h1'>Spells</Typography>
      <Typography variant='body1'>All the spells in the world.</Typography>
      <List sx={{width: 360}}>
        {(typeof spells === 'undefined') ?
        (<p>Loading...</p>
        ) : (
          spells.map(spell =>
          <ListItem
            key={spell.slug}
            secondaryAction={
              <>
                <IconButton edge='end' onClick={handleClickOpen(spell)}>
                  <InfoOutlinedIcon />
                </IconButton>
                <SpellInfo spell={activeSpell} open={open} setOpen={setOpen} />
              </>
            }
            disablePadding>
            <ListItemButton role='undefined' onClick={handleToggle(spell)} dense>
              <ListItemIcon>
                <Checkbox
                  edge='start'
                  checked={selectedSpells.some((s) => s.slug === spell.slug)}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary={spell.name} />
            </ListItemButton>
          </ListItem>
          )
        )}
      </List>
    </Box>
  )
}

export default AllSpells
