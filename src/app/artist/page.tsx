import { Suspense } from 'react';
 
async function getArtistPlaylists(artistID) {   
  
  const playlists = [
    {
      id: 1,
      name: 'Debbie'
    },
    {
      id: 2,
      name: 'Frankie'
    },

  ]

  return playlists;
}

async function getArtist(username) {

  return {
      id: 11,
      name: 'Carl'
  }
}




async function Playlists({ artistID }: { artistID: string }) {
  // Wait for the playlists
  const playlists = await getArtistPlaylists(artistID);
 
  return (
    <ul>
      {playlists.map((playlist) => (
        <li key={playlist.id}>{playlist.name}</li>
      ))}
    </ul>
  );
}
 
export default async function Page({
  params: { username },
}: {
  params: { username: string };
}) {
  // Wait for the artist
  const artist = await getArtist(username);
 
  return (
    <>
      <h1>{artist.name}</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Playlists artistID={artist.id} />
      </Suspense>
    </>
  );
}