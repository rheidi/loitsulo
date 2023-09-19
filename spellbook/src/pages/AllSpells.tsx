import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Checkbox, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useGetSpellsList } from '../components/getSpells'
import { Spell } from '../types/Spell'
import SpellContext from '../components/SpellContext'
import { SpellInfo } from '../components/SpellInfo';

const getFilteredList = (spells: Spell[] | undefined, search: string) => {
  if(spells === undefined) return [] //No spells to filter
  return spells.filter(spell => spell.name.toLowerCase().includes(search.toLocaleLowerCase()))
}

const AllSpells = () => {
  const spellsRes = useGetSpellsList(`https://api.open5e.com/spells/?document__slug__iexact=wotc-srd&limit=500`)
  var spells = spellsRes?.results
  var count = spellsRes?.count

  const { selectedSpells, setSelectedSpells } = useContext(SpellContext)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState(search)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(timer)
  }, [search])
  const filteredSpells = getFilteredList(spells, debouncedSearch)

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

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
      <Typography variant='body1'>All spells in the world.</Typography>
      <Box>
        <TextField
          sx={{p:1, minWidth: 250}}
          type='text'
          label='Search'
          id='search'
          value={search}
          onChange={onSearchChange}
        />
      </Box>
      <List sx={{width: 360}}>
        {(typeof spells === 'undefined') ?
        (<p>Loading...</p>
        ) : (
          filteredSpells.map(spell =>
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
