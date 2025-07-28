import * as combobox from '@zag-js/combobox'
import { useMachine, normalizeProps } from '@zag-js/react'
import { useState, useId } from 'react'

export function Combobox({ options, value, onChange }) {
  const [filteredOptions, setFilteredOptions] = useState(options)

  const collection = combobox.collection({ items: filteredOptions })

  const service = useMachine(combobox.machine, {
    id: useId(),
    collection,
    value,
    onValueChange: ({ value }) => {
      onChange(value)
    },
    onOpenChange: () => {
      setFilteredOptions(options)
    },
    onInputValueChange: ({ inputValue }) => {
      const filtered = options.filter(item =>
        item.label.toLowerCase().includes(inputValue.toLowerCase()),
      )
      setFilteredOptions(filtered.length > 0 ? filtered : options)
    },
  })

  const api = combobox.connect(service, normalizeProps)

  return (
    <div>
      <div {...api.getRootProps()}>
        <label {...api.getLabelProps()}>Select country</label>
        <div {...api.getControlProps()}>
          <input {...api.getInputProps()} />
          <button {...api.getTriggerProps()}>▼</button>
        </div>
      </div>
      <div {...api.getPositionerProps()}>
        {filteredOptions.length > 0 && (
          <ul {...api.getContentProps()}>
            {filteredOptions.map(item => (
              <li key={item.value} {...api.getItemProps({ item })}>
                {item.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
