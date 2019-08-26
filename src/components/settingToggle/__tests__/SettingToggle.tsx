import React from 'react'
import renderer from 'react-test-renderer'
import SettingToggle from '../SettingToggle'

test('Compare component to snapshot', () => {
  const component = renderer.create(
    <SettingToggle
      value
      onToggle={jest.fn()}
      disabled={false}
    />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
