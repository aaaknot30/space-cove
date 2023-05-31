
 
async function getArtist(username: string) {
  // const res = await fetch(`https://api.example.com/artist/${username}`);
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/1`);

  return res.json();
}
 
async function getArtistAlbums(username: string) {
  // const res = await fetch(`https://api.example.com/artist/${username}/albums`);
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/2`);
  return res.json();
}
 
export default async function Page({
  params: { username },
}: {
  params: { username: string };
}) {
  // Initiate both requests in parallel
  const artistData = getArtist(username);
  const albumsData = getArtistAlbums(username);
 
  // Wait for the promises to resolve
  const [product1, product2] = await Promise.all([artistData, albumsData]);
 
  return (
    <>
      <h1>{product1.title}</h1>
      <h1>{product2.title}</h1>
    </>
  );
}