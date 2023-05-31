import { NextResponse } from 'next/server';
import clientPromise from "../../../lib/mongodb";
 
export async function GET(request: Request) {
    const client = await clientPromise;
        console.log("--- --- client")
        console.log(client);
        const db = await client.db("sample_mflix");
        console.log("-------- db:");
        console.log(db);

    const movies = await db
        .collection("movies")
        .find({})
        .sort({ metacritic: -1 })
        .limit(10)
        .toArray();
        console.log(movies)

        //res.json(movies);


  return NextResponse.json(JSON.parse(JSON.stringify(movies)));
}



