import { Album, Artist, Song } from "@prisma/client";

type AlbumWithArtist = Album & {artist: Artist};
type AlbumWithArtistAndSongs = AlbumWithArtist & {songs: Song[]};
type SongWithAlbum = Song & {album: Album};
type SongWithAlbumAndArtist = SongWithAlbum & {artist: Artist};

export type { AlbumWithArtist, AlbumWithArtistAndSongs, SongWithAlbum, SongWithAlbumAndArtist };