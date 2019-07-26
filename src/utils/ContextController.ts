import { Spotify } from './Spoitfy'

export interface IContextController {
  search(query: string): void
}

export class SearchResult<T> {
  constructor(public display: boolean, public results: T[]) {}
}

export class GenericSearchResult {
  constructor(
    public display: boolean,
    public results: { title: string; author: string; src: string }[]
  ) {}
}

export class ContextController<T> {
  constructor(
    protected spotify: Spotify,
    protected setResults: React.Dispatch<SearchResult<T>>
  ) {}
}

export class TrackController extends ContextController<
  SpotifyApi.TrackObjectFull
> {
  search(query: string): void {
    this.spotify.searchTrack(query).then(data => {
      this.setResults(new SearchResult(true, data.tracks.items.slice(0, 3)))
    })
  }

  formatResults(
    searchResult: SearchResult<SpotifyApi.TrackObjectFull>
  ): GenericSearchResult {
    return new GenericSearchResult(
      searchResult.display,
      searchResult.results.map(result => ({
        title: result.name,
        author: result.artists[0].name,
        src: result.album.images[0].url
      }))
    )
  }

  getItemSrc(item: SpotifyApi.TrackObjectFull): string {
    return item === undefined ? '' : item.album.images[0].url
  }

  play(track: SpotifyApi.TrackObjectFull): void {
    this.spotify.play({ uris: [track.uri] })
  }
}
