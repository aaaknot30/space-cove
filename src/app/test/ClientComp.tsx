'use client'
import { useState } from 'react';

export default async function ClientComp( {getData} ) {

  const [age, setAge] = useState(28);
  const id = 666

  return (
    <div>
      <p onClick={()=> getData(id)}>Click</p>
      <p>{age}</p>
    </div>
  )
}