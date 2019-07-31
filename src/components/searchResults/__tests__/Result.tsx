import React from 'react'
import Result from '../Result'
import renderer from 'react-test-renderer'
import { shallow } from '../../../enzyme'

test('Compare component to snapshot', () => {
  const component = renderer.create(
    <Result
      title='Hey, Jude'
      author='The Beatles'
      image=''
      onClick={jest.fn()}
    />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Test result click', () => {
  const mockCallBack = jest.fn()

  const result = shallow(
    <Result
      title='Hey, Jude'
      author='The Beatles'
      image=''
      onClick={mockCallBack}
    />
  )
  result.find('.result').simulate('click')
  expect(mockCallBack.mock.calls.length).toEqual(1)
})
