import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import { Spell } from '../types/Spell'
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface SpellInfoProps {
  spell?: Spell
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const SpellInfo = ({spell, open, setOpen}: SpellInfoProps) => {

  if (spell === undefined) {
    setOpen(false)
    return null
  }

  interface SpellDialogTitleProps {
    id: string;
    children?: ReactNode;
    onClose: () => void;
  }

  const SpellDialogTitle = (props: SpellDialogTitleProps) => {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }

  const handleClose = () => {
    setOpen(false)
  }  

  return (
    <Dialog
      onClose={handleClose}
      open={open}
    >
      <SpellDialogTitle id={spell.slug} onClose={handleClose}>
        {spell.name}
      </SpellDialogTitle>
      <DialogContent dividers>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">{spell.level} {spell.school.toLowerCase()}</Typography>
        <Typography gutterBottom variant="body2">
          Casting time: {spell.casting_time}<br />
          Range: {spell.range}<br />
          Components: {spell.components}<br />
          {(spell.requires_material_components) ?
            (
              <Typography variant="body2">{spell.material}<br /></Typography>
            ) : (
              <></>
            )}
          Duration: {spell.duration}<br />
          Requires consentration: {spell.concentration}<br />
          Ritual: {spell.ritual}<br />
        </Typography>
        <Typography paragraph>{spell.desc}</Typography>
        <Typography paragraph>At higher levels: {spell.higher_level}</Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">{spell.dnd_class}</Typography>
      </DialogContent>
      
    </Dialog>
  )
}
