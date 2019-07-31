export enum BulletType {
  Songs,
  Albums,
  Artists
}

export type SettingOptions = {
  bulletType: BulletType
  randomBullet: boolean
  dangerMode: boolean
}