async function getData() {
  const res = await fetch('http://localhost:3000/api/apod/');
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
 
  return res.json();
}
 
export default async function Page() {
  const data = await getData();
  console.log("--- data.product ---");
  console.log(data.product);
 
  return (
    <main>
      <h1>Title</h1>
      <p>{data.product.title}</p>
    </main>
  );
}