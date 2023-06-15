import { Dispatch, SetStateAction, createContext } from 'react'
import { Spell } from '../types/Spell'

interface SpellContextProps {
  selectedSpells: Spell[]
  setSelectedSpells: Dispatch<SetStateAction<Spell[]>>
}

export const SpellContext = createContext<SpellContextProps>({
  selectedSpells: [],
  setSelectedSpells: () => {console.log("no nyt sitä kontekstia saatana")}
})

export default SpellContext
