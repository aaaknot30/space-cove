import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  // const id = searchParams.get('id');
  const id = 1;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      // 'API-Key': process.env.DATA_API_KEY,
    },
  });
  const product = await res.json();
  console.log("-------------------")
  console.log(process.env.DATA_API_KEY);
 
  return NextResponse.json({ product });
}


