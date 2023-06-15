import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Checkbox, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { useGetSpellsList } from '../components/getSpells'
import { Spell } from '../types/Spell'
import SpellContext from '../components/SpellContext'

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

      console.log(newSelectedSpells)
      return newSelectedSpells
    })
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant='h1'>Spells</Typography>
      <Typography variant='body1'>All the spells in the world.</Typography>
      <List sx={{width: 400}}>
        {(typeof spells === 'undefined') ?
        (<p>Loading...</p>
        ) : (
          spells.map(spell =>
          <ListItem
            key={spell.slug}
            secondaryAction={
              <IconButton edge='end'>
                <InfoOutlinedIcon />
              </IconButton>
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
            </ListItemButton>
            <ListItemText sx={{ lm: -2 }} primary={spell.name} />
          </ListItem>
          )
        )}
      </List>
    </Box>
  )
}

export default AllSpells
