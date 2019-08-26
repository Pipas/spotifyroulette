import React from 'react'
import renderer from 'react-test-renderer'
import SettingChips from '../SettingChips'

test('Compare component to snapshot', () => {
  const component = renderer.create(
    <SettingChips
      chips={['Test 1', 'Test 2', 'Test 3']}
      selected={0}
      onSelect={jest.fn()}
    />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
