import { Box, Card, CardContent, Grid, Link, Typography } from '@mui/material'
import React, { useContext } from 'react'
import SpellContext from '../components/SpellContext'

const MySpells = () => {
  const { selectedSpells, setSelectedSpells } = useContext(SpellContext)
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant='h1'>My spellbook</Typography>
      {selectedSpells.length === 0 ? (
        <Box>
          <Typography gutterBottom variant='h5'>No spells selected yet</Typography>
          <Link href='/spells'>Get some spellz here</Link>
        </Box>
      ) : (
        <Box>
          <Typography variant='h3'>Selected spellz.</Typography>
          <Grid container spacing={2} sx={{pt:1}}>
            {selectedSpells.map((s) => (
              <Grid item key={s.slug} width={300}>
                <Card>
                  <CardContent>
                    <Typography gutterBottom variant="h5">{s.name}</Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">{s.level} {s.school}</Typography>
                    <Typography variant="body2">
                      Casting time: {s.casting_time}<br />
                      Range: {s.range}<br />
                      Components: {s.components}<br />
                      Duration: {s.duration}<br />
                    </Typography>
                    <Typography paragraph>{s.desc}</Typography>
                  </CardContent>
                </Card>
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
