import React from 'react'
import renderer from 'react-test-renderer'
import Settings from '../Settings'
import { BulletType } from '../../../types/SettingTypes'

test('Compare component to snapshot', () => {
  const component = renderer.create(
    <Settings
      visible
      settings={{bulletType: BulletType.Albums, randomBullet: false, dangerMode: false}}
      setSettings={jest.fn()}
      toggleVisibility={jest.fn()}
    />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
