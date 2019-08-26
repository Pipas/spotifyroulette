import React from 'react'
import renderer from 'react-test-renderer'
import ActionButtons from '../ActionButtons'

test('Compare component to snapshot', () => {
  const component = renderer.create(
    <ActionButtons
      visible
      onRerollClick={jest.fn()}
      onResetClick={jest.fn()}
    />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
