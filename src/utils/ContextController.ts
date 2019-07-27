import { SpotifyClient } from './Spoitfy'

export interface ContextController {
  search(query: string, client: SpotifyClient): Promise<SearchResult>
}

export type SpotifyItem = {
  title: string
  author: string
  image: string
  uri: string
}

export class SearchResult {
  constructor(public display: boolean, public results: SpotifyItem[]) {}
}

export class TrackController implements ContextController {
  async search(query: string, client: SpotifyClient): Promise<SearchResult> {
    const tracks = await client.searchTracks(query)
    return new SearchResult(true, tracks.tracks.items.slice(0, 3).map(this.formatResult))
  }

  formatResult(track: SpotifyApi.TrackObjectFull): SpotifyItem {
    return {
        title: track.name,
        author: track.artists[0].name,
        image: track.album.images[0].url,
        uri: track.uri
      }
  }
}
