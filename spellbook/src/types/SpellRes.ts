import { Spell } from "./Spell"

export interface SpellRes{
  count: number
  next: null | string
  previous: null | string
  results: Spell[]
}