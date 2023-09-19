export interface Spell{
  slug: string
  name: string
  desc: string
  higher_level: string
  range: string
  components: string
  requires_verbal_components: boolean
  requires_somatic_components: boolean
  requires_material_components: boolean
  material: string
  can_be_cast_as_ritual: boolean
  ritual: string
  duration: string
  concentration: string
  requires_concentration: boolean
  casting_time: string
  level: string
  spell_level: number
  school: string
  dnd_class: string
  spell_lists: string[]
  circles: string
  document__slug: string
}
