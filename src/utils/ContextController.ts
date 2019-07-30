import { SpotifyClient } from './Spoitfy'
import placeholder from '../images/placeholder.png'

export interface ContextController {
  search(query: string, client: SpotifyClient): Promise<SearchResult>
}

export type SpotifyItem = {
  title: string
  author: string
  image: string
  playParameters: {}
  shuffle: boolean
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
        image: track.album.images.length > 0 ? track.album.images[0].url : placeholder,
        playParameters: {uris: [track.uri]},
        shuffle: false
      }
  }
}

export class AlbumController implements ContextController {
  async search(query: string, client: SpotifyClient): Promise<SearchResult> {
    const albums = await client.searchAlbums(query)
    return new SearchResult(true, albums.albums.items.slice(0,3).map(this.formatResult))
  }

  formatResult(album: any): SpotifyItem {
    return {
        title: album.name,
        author: album.artists[0].name,
        image: album.images.length > 0 ? album.images[0].url : placeholder,
        playParameters: { context_uri: album.uri },
        shuffle: false
      }
  }
}

export class ArtistController implements ContextController {
  async search(query: string, client: SpotifyClient): Promise<SearchResult> {
    const artists = await client.searchArtists(query)
    return new SearchResult(true, artists.artists.items.slice(0,3).map(this.formatResult))
  }

  formatResult(artist: SpotifyApi.ArtistObjectFull): SpotifyItem {
    return {
        title: artist.name,
        author: 'Artist',
        image: artist.images.length > 0 ? artist.images[0].url : placeholder,
        playParameters: { context_uri: artist.uri },
        shuffle: true
      }
  }
}
