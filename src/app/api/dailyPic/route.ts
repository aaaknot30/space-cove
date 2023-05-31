import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  // const id = searchParams.get('id');
  const key = 'vT0eAzxpHVDuOw5GxU9TfZcHJ8WTVVbP7BCzljcs';
  const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${key}`);
  const apod = await res.json();
  console.log(apod)
  console.log("-------------------")
  console.log(process.env.DATA_API_KEY);
 
  return NextResponse.json( apod );
}
