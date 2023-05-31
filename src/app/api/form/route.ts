import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest, response: NextResponse) {
  //console.log(await request.formData())
  const formData = await request.formData()
  return NextResponse.json(
    {
      first: formData.get('first'),
      last: formData.get('last')
    }
  ) 
}