import { Box, Card, CardContent, Grid, Link, Typography } from '@mui/material'
import React, { useContext } from 'react'
import SpellContext from '../components/SpellContext'

const MySpells = () => {
  const { selectedSpells } = useContext(SpellContext)
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
                    <Typography variant="h5">{s.name}</Typography>
                    <Typography sx={{ mb: 1.2 }} color="text.secondary">{s.level} {s.school.toLowerCase()}</Typography>
                    <Typography gutterBottom variant="body2">
                      Casting time: {s.casting_time}<br />
                      Range: {s.range}<br />
                      Components: {s.components}<br />
                      {(s.requires_material_components) ?
                        (
                          <Typography variant="body2">Materials: {s.material}<br /></Typography>
                        ) : (
                          <></>
                        )}
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
