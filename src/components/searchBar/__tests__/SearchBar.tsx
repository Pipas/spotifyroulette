import React from 'react'
import SearchBar from '../SearchBar'
import renderer from 'react-test-renderer'

test('Compare component to snapshot', () => {
  const component = renderer.create(
    <SearchBar
      onSearch={jest.fn()}
      onQueryChange={jest.fn()}
      onSettingsClick={jest.fn()}
      locked={false}
      tooltip={'test'}
    />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})