import React from 'react'
import './SettingChips.css'

type SettingChipsProps = {
  chips: string[]
  selected: number
  onSelect: (bullet: number) => void
}

const SettingChips: React.FC<SettingChipsProps> = props => {
  const chips = props.chips.map((chip, i) => (
    <div
      className={`chip ${i === props.selected ? 'selected' : ''}`}
      onClick={() => props.onSelect(i)}
    >
      {chip}
    </div>
  ))

  return <div className='chipContainer'>{chips}</div>
}

export default SettingChips
