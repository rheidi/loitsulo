import { Card, CardHeader, IconButton, CardContent, Typography, CardActions, Collapse, IconButtonProps, styled } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'
import CopyrightIcon from '@mui/icons-material/Copyright';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Spell } from "../types/Spell"
import { useContext } from "react";
import SpellContext from "./SpellContext";
import React from "react";

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
}))

const SpellCard = ({spell}: {spell: Spell}) => {
  const { selectedSpells, setSelectedSpells } = useContext(SpellContext)

  const handleRemove = (s: Spell) => () => {
    setSelectedSpells((selectedSpells) => {
      return selectedSpells.filter((spell) => spell.slug !== s.slug)
    })
  }
  
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardHeader
        title={spell.name}
        action={
          <IconButton role='remove' onClick={handleRemove(spell)} aria-label="remove spell">
            <CloseIcon />
          </IconButton>
        }
      />
      <CardContent>
        <Typography sx={{ mb: 1.2 }} color="text.secondary">{spell.level} {spell.school.toLowerCase()}</Typography>
        <Typography variant="subtitle2">
          Casting time: {spell.casting_time}<br />
          Range: {spell.range}<br />
          Components: {spell.components}<br />
          {(spell.requires_material_components) ?
            (
              <Typography variant="subtitle2">Materials: {spell.material}<br /></Typography>
            ) : (
              <></>
            )}
          Duration: {spell.duration}<br />
          
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {(spell.requires_concentration) ?
          (
            <CopyrightIcon />
          ) : (
            <></>
          )}
        {(spell.can_be_cast_as_ritual) ?
          (
            <Typography variant="subtitle2">®</Typography>
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
          <Typography paragraph>{spell.desc}</Typography>
          {(spell.higher_level) ?
            (
              <Typography paragraph>At higher levels: {spell.higher_level}</Typography>
            ) : (
              <></>
            )}
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default SpellCard
