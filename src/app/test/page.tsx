import styles from './page.module.css'
import '../globals.css'
import { Link } from 'next/link';
import { Metadata } from 'next';
import Image from 'next/image'
import { revalidatePath } from "next/cache";
import ClientComp from './ClientComp'


export const metadata: Metadata = {
  title: 'Space Cove - Test',
};


async function getData(id) {
  'use server'
  console.log("--- getData id --------")
  console.log(id)
  return {name: "Kyle"};
}


export default async function Test() {

  return (
    <main>
      <h1>Test Page</h1>
      <ClientComp getData={getData}/>
    </main>
  )
}
