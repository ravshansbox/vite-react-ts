import { ComponentType, useState } from 'react'
import { Combobox } from './Combobox'

const options = [
  { value: 'ZA', label: 'Zambia' },
  { value: 'BN', label: 'Benin' },
]

export const App: ComponentType = () => {
  const [value, setValue] = useState(['BN'])

  return <Combobox options={options} value={value} onChange={setValue} />
}
