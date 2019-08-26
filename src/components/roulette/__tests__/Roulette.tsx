import React from 'react'
import renderer from 'react-test-renderer'
import Roulette from '../Roulette'
import { RouletteState } from '../../../types/RouletteTypes'

test('Compare component to snapshot', () => {
  const component = renderer.create(
    <Roulette
      blanks={[]}
      bullet={{
        title: 'Hey, Jude',
        author: 'The Beatles',
        image: '',
        playParameters: {},
        shuffle: false
      }}
      state={RouletteState.IDLE}
      setState={jest.fn()}
      randomBullet={false}
      dangerMode={false}
      onShoot={jest.fn()}
    />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
