import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Checkbox, FormControl, IconButton, InputLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useGetSpellsList } from '../components/getSpells'
import { Spell } from '../types/Spell'
import SpellContext from '../components/SpellContext'
import { SpellInfo } from '../components/SpellInfo';

const getFilteredList = (spells: Spell[] | undefined, search: string, selectedClass: string, level: string) => {
  if(spells === undefined) return [] //No spells to filter

  var filteredSpells = spells.filter(spell => spell.name.toLowerCase().includes(search.toLocaleLowerCase())
  && spell.dnd_class.includes(selectedClass))

  const lvl = parseInt(level)
  if (!isNaN(lvl)) filteredSpells = filteredSpells.filter(spell => spell.spell_level === parseInt(level))
  return filteredSpells
}

const AllSpells = () => {
  const spellsRes = useGetSpellsList(`https://api.open5e.com/spells/?document__slug__iexact=wotc-srd&limit=500`)
  var spells = spellsRes?.results
  var count = spellsRes?.count

  const { selectedSpells, setSelectedSpells } = useContext(SpellContext)
  const [search, setSearch] = useState('')
  const [selectedClass, setSelectedClass] = useState('')
  const [level, setLevel] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState(search)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(timer)
  }, [search])
  const filteredSpells = getFilteredList(spells, debouncedSearch, selectedClass, level)

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const onClassChange = (e: SelectChangeEvent) => {
    setSelectedClass(e.target.value)    
  }

  const onLevelChange = (e: SelectChangeEvent) => {
    setLevel(e.target.value)
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
    <Box sx={{ p: 1 }}>
      <Typography variant='h1'>Spells</Typography>
      <Typography variant='body1'>All spells in the world.</Typography>
      <Box sx={{p:0}}>
        <TextField
          sx={{p:1, width: 200}}
          type='text'
          label='Search'
          id='search'
          value={search}
          onChange={onSearchChange}
        />
        <FormControl sx={{p:1, minWidth: 200}}>
          <InputLabel id='selectClass'>Class</InputLabel>
          <Select id='class' value={selectedClass} label='class' onChange={onClassChange}>
            <MenuItem value={''}>none</MenuItem>
            <MenuItem value={'Bard'}>Bard</MenuItem>
            <MenuItem value={'Cleric'}>Cleric</MenuItem>
            <MenuItem value={'Druid'}>Druid</MenuItem>
            <MenuItem value={'Paladin'}>Paladin</MenuItem>
            <MenuItem value={'Sorcerer'}>Sorcerer</MenuItem>
            <MenuItem value={'Warlock'}>Warlock</MenuItem>
            <MenuItem value={'Wizard'}>Wizard</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{p:1, minWidth: 100}}>
          <InputLabel id='selectLevel'>Level</InputLabel>
          <Select id='level' value={level} label='level' onChange={onLevelChange}>
            <MenuItem value={''}>none</MenuItem>
            <MenuItem value={0}>Cantrips</MenuItem>
            <MenuItem value={1}>1st level</MenuItem>
            <MenuItem value={2}>2nd level</MenuItem>
            <MenuItem value={3}>3rd level</MenuItem>
            <MenuItem value={4}>4th level</MenuItem>
            <MenuItem value={5}>5th level</MenuItem>
            <MenuItem value={6}>6th level</MenuItem>
            <MenuItem value={7}>7th level</MenuItem>
            <MenuItem value={8}>8th level</MenuItem>
            <MenuItem value={9}>9th level</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <List sx={{width: 400}}>
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
