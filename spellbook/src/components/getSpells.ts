import { useEffect, useState } from "react"
import axios from "axios"
import { SpellRes } from "../types/SpellRes"

export const useGetSpellsList = (url: string) => {
  const [spells, setSpells] = useState<SpellRes>()

  useEffect(() => {
    const fetchSpells = async () => {
      try {
        const { data } = await axios.get(url)
        setSpells(data)
      } catch (e) {
        console.error('Could not retrieve data, error: ', e)
      }
    }
    fetchSpells()
  }, [url])
  return spells
}