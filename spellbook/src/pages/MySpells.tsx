import { Box, Button, Card, CardActions, CardContent, CardHeader, Collapse, Grid, IconButton, IconButtonProps, Link, Popper, Typography, styled } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import CopyrightIcon from '@mui/icons-material/Copyright';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useContext } from 'react'
import SpellContext from '../components/SpellContext'
import { Spell } from '../types/Spell'

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const MySpells = () => {
  const { selectedSpells, setSelectedSpells } = useContext(SpellContext)

  const handleRemove = (s: Spell) => () => {
    setSelectedSpells((selectedSpells) => {
      return selectedSpells.filter((spell) => spell.slug !== s.slug)
    })
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleConfirmPopper = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  };

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popper' : undefined

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
                <Card>
                  <CardHeader
                    title={s.name}
                    action={
                      <IconButton role='remove' onClick={handleRemove(s)} aria-label="remove spell">
                        <CloseIcon />
                      </IconButton>
                    }
                  />
                  <CardContent>
                    <Typography sx={{ mb: 1.2 }} color="text.secondary">{s.level} {s.school.toLowerCase()}</Typography>
                    <Typography variant="subtitle2">
                      Casting time: {s.casting_time}<br />
                      Range: {s.range}<br />
                      Components: {s.components}<br />
                      {(s.requires_material_components) ?
                        (
                          <Typography variant="subtitle2">Materials: {s.material}<br /></Typography>
                        ) : (
                          <></>
                        )}
                      Duration: {s.duration}<br />
                      
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    {(s.requires_concentration) ?
                      (
                        <CopyrightIcon />
                      ) : (
                        <></>
                      )}
                    {(s.can_be_cast_as_ritual) ?
                      (
                        <Typography variant="subtitle2">R</Typography>
                      ) : (
                        <></>
                      )}
                    <ExpandMore
                      expand={expanded}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </CardActions>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography paragraph>{s.desc}</Typography>
                    </CardContent>
                  </Collapse>
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
