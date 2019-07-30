import SpotifyWebApi from 'spotify-web-api-js'
import {
  ContextController,
  SearchResult,
  SpotifyItem
} from './ContextController'
import placeholder from '../images/placeholder.png'

export type SpotifyClient = SpotifyWebApi.SpotifyWebApiJs

export class Spotify {
  private client: SpotifyClient
  private auth: boolean = false
  private deviceId: string = ''
  private controller: ContextController

  constructor(controller: ContextController) {
    this.client = new SpotifyWebApi()
    this.controller = controller
  }

  setController(controller: ContextController) {
    this.controller = controller
  }

  authenticateUser() {
    const access_token = window.location.hash
      .substring(1)
      .split('&')[0]
      .split('=')[1]
    window.location.hash = ''
    window.history.pushState(
      '',
      document.title,
      window.location.pathname + window.location.search
    )

    const authEndpoint = 'https://accounts.spotify.com/authorize'
    const clientId = '41e10dc3f3594667b190b3681fdee8ca'
    const redirectUri =
      process.env.NODE_ENV === 'production'
        ? 'https://paulocorreia.me/spotifyroulette/'
        : 'http://localhost:3000/'
    const scopes = [
      'user-top-read',
      'user-modify-playback-state',
      'user-read-playback-state'
    ]

    // If there is no token, redirect to Spotify authorization
    if (!access_token) {
      window.location.href = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
        '%20'
      )}&response_type=token&show_dialog=true`
    } else {
      this.client.setAccessToken(access_token)
      this.auth = true
    }
  }

  async search(query: string): Promise<SearchResult> {
    return await this.controller.search(query, this.client)
  }

  play(item: SpotifyItem | undefined) {
    if (this.deviceId !== '' && item !== undefined) {
      this.client.setShuffle(item.shuffle)
      this.client
        .play({ device_id: this.deviceId, ...item.playParameters })
        .catch()
    }
  }

  async hasPlayerOpen(): Promise<boolean> {
    const devices = await this.client.getMyDevices()
    if (devices.devices.length === 0) return false
    else {
      if (devices.devices[0].id !== null) {
        this.deviceId = devices.devices[0].id
        return true
      } else return false
    }
  }

  private searchRandomTrack(): Promise<SpotifyApi.SearchResponse> {
    const vowels = 'aeiou'
    const characters = 'abcdefghijklmnopqrstuvwxyz '

    const randomString =
      '' +
      vowels[Math.floor(Math.random() * vowels.length)] +
      characters[Math.floor(Math.random() * characters.length)]

    return this.client.search(randomString, ['track'], {
      offset: Math.floor(Math.random() * 999),
      limit: 50
    })
  }

  async getRandomTrack(): Promise<SpotifyItem> {
    const randomSearch = await this.searchRandomTrack()
    if (randomSearch.tracks && randomSearch.tracks.items.length > 0) {
      const track = randomSearch.tracks.items[Math.floor(Math.random() * 50)]
      const trackItem = {
        title: track.name,
        author: track.artists[0].name,
        image:
          track.album.images.length > 0
            ? track.album.images[0].url
            : placeholder,
        playParameters: { uris: [track.uri] },
        shuffle: false
      }
      return trackItem
    } else return this.getRandomTrack()
  }

  isAuthenticated() {
    return this.auth
  }
}
