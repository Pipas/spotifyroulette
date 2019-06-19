import SpotifyWebApi from 'spotify-web-api-js'

export class Spotify {
  private client: SpotifyWebApi.SpotifyWebApiJs
  private auth: boolean = false

  constructor() {
    this.client = new SpotifyWebApi()
  }

  authenticateUser() {
    const access_token = window.location.hash
      .substring(1)
      .split('&')[0]
      .split('=')[1]
    window.location.hash = ''

    const authEndpoint = 'https://accounts.spotify.com/authorize'
    const clientId = '41e10dc3f3594667b190b3681fdee8ca'
    const redirectUri = process.env.NODE_ENV === 'production' ? 'https://spotifyroulette.paulocorreia.me/' : 'http://192.168.1.10:3000/'
    const scopes = [
      'user-top-read'
    ];

    // If there is no token, redirect to Spotify authorization
    if (!access_token) {
      window.location.href = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`
    } else {
      this.client.setAccessToken(access_token)
      this.auth = true
    }
  }

  searchTrack(query: string): Promise<SpotifyApi.TrackSearchResponse> {
    return this.client.searchTracks(query)
  }

  isAuthenticated() {
    return this.auth
  }
}
