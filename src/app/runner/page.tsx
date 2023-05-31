import Image from 'next/image'
import styles from '../page.module.css'
import Counter from '../../components/counter';
import Monitor from '../../components/Monitor';
import '../globals.css'
import { Link } from 'next/link';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Space Cove - APOD',
};

const BASE_URL = process.env.BASE_URL;


async function getData() {
  const response = await fetch(`${BASE_URL}/api/movies`,  { cache: 'no-store' });
  return response.json();
}


function Panel() {
  return (
      <h3>Panel</h3>
  );
}

 
export default async function Apod() {
  const data = await getData();

  const gett = data.map((item, index)=> {
    return (
      <p key={index}>{item.plot}</p>
    )
  })
  
  return (
    <main>
        <h2>Space Cove - Runner</h2>
        <p> {data[0].plot} </p>
        {gett}
        <Panel />

      
    </main>
  )
}
