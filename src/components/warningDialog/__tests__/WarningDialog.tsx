import React from 'react'
import renderer from 'react-test-renderer'
import WarningDialog from '../WarningDialog'

test('Compare component to snapshot', () => {
  const component = renderer.create(
    <WarningDialog
      visible
      onRetryClick={jest.fn()}
      onContinueClick={jest.fn()}
    />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
