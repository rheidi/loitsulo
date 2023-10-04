import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Checkbox, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SelectChangeEvent, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useGetSpellsList } from '../hooks/getSpells'
import { Spell } from '../types/Spell'
import SpellContext from '../components/SpellContext'
import { SpellInfo } from '../components/SpellInfo';
import ToolBar from '../components/ToolBar';

const getFilteredList = (spells: Spell[] | undefined, search: string, selectedClass: string, level: string) => {
  if(spells === undefined) return [] //No spells to filter

  const filteredSpells = spells.filter(spell => spell.name.toLowerCase().includes(search.toLocaleLowerCase())
  && spell.dnd_class.includes(selectedClass))

  const lvl = parseInt(level)
  if (!isNaN(lvl)) return filteredSpells.filter(spell => spell.spell_level === parseInt(level))
  return filteredSpells
}

const AllSpells = () => {
  const spellsRes = useGetSpellsList(`https://api.open5e.com/spells/?document__slug__iexact=wotc-srd&limit=500`)
  const spells = spellsRes?.results
  const count = spellsRes?.count

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

      return newSelectedSpells.sort((a, b) => a.spell_level - b.spell_level)
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
      <Typography variant='h5'>All spells in the world.</Typography>
      <ToolBar search={search} onSearchChange={onSearchChange} selectedClass={selectedClass} onClassChange={onClassChange} level={level} onLevelChange={onLevelChange}/>
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
      <SpellInfo spell={activeSpell} open={open} setOpen={setOpen} />
    </Box>
  )
}

export default AllSpells
