import { Box, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material"

type ToolBarProps = {
  search: string
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  selectedClass: string
  onClassChange: (e: SelectChangeEvent) => void
  level: string
  onLevelChange : (e: SelectChangeEvent) => void
}
const ToolBar = ({search, onSearchChange, selectedClass, onClassChange, level, onLevelChange}: ToolBarProps) => {
  return (
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
  )
}

export default ToolBar
