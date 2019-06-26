import { Spotify } from './Spoitfy'

export type SearchResult = { title: string; author: string; src: string }[]

export interface IContextController {
  search(query: string): void
}

export class ContextController<T> {
  constructor(
    protected spotify: Spotify,
    protected setResults: React.Dispatch<React.SetStateAction<T[]>>
  ) {}
}

export class TrackController extends ContextController<SpotifyApi.TrackObjectFull> {
  search(query: string): void {
    this.spotify.searchTrack(query).then(data => {
      this.setResults(data.tracks.items.slice(0, 3))
    })
  }

  formatResults(results: SpotifyApi.TrackObjectFull[]): SearchResult {
    return results.map(item => ({
      title: item.name,
      author: item.artists[0].name,
      src: item.album.images[0].url
    }))
  }

  getItemSrc(item: SpotifyApi.TrackObjectFull): string {
    return item === undefined ? '' : item.album.images[0].url
  }

  play(track: SpotifyApi.TrackObjectFull): void {
    this.spotify.play({uris: [track.uri]})
  }
}
