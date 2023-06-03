import styles from './page.module.css'
import '../globals.css'
import Link from 'next/link';
import { Metadata } from 'next';
import Image from 'next/image'
import { revalidatePath } from "next/cache";
import defaultResponse from '../../json/patent1.json'


export const metadata: Metadata = {
  title: 'Space Cove - Patent',
};


const searchWords = ['fuel']
let search = 'fuel'
let isVideoOnly = false

async function formSubmit(formData: FormData) {
  'use server'
  console.log("--- formsubmit")
  console.log(formData)
  const search = formData.get("search") as string;
  // const isVideo = formData.get("isVideo") as boolean;
  console.log("--- search")
  console.log(search)
  // console.log("--- isVideo")
  // console.log(isVideo)
  // isVideoOnly = isVideo
  searchWords.pop()
  searchWords.unshift(search)
  revalidatePath("/");
}

async function getData() {
  console.log("--------- --------- getData")
  console.log("searchWords", searchWords)
  search = searchWords[0] ? searchWords[0] : 'engine'
  const key = 'vT0eAzxpHVDuOw5GxU9TfZcHJ8WTVVbP7BCzljcs';
  const url = `https://api.nasa.gov/techtransfer/patent/?${search}&api_key=${key}`
  console.log(url)
  const res = await fetch(url);
  let data = await res.json()
  if (data.results.length === 0) {
    data = defaultResponse
  }
  return data
}


export default async function Search() {


  console.log('---------- searchResponse')
  //console.log(searchResponse)
   const data = await getData();
  // const photos = data.photos
  // let collection = isVideoOnly ? 
  //   data.collection.items.filter(item => item.data[0].media_type === 'video') :
  //   data.collection.items.filter((item, index) => index < 21)

  let collection = data.results


  return (
    <main>
        <div className={styles.flex}>
          <h2 className={styles.h2}>Patents Search</h2>
          <form action={formSubmit}  className={styles.flex}>
            <input
                type="text"
                name="search" 
                id="search"
                width="100px"
                placeholder="Search" />
            <button
                className={styles.button}
                type="submit">
                Search
            </button>
          </form>
        </div>

        <div className={styles.grid}>
          {collection.map((item, i)=> {
            return (

              <div key={i}>
                <strong><div dangerouslySetInnerHTML={{__html: item[2]}} /></strong>
                <p>{item[1]}</p>
                <div dangerouslySetInnerHTML={{__html: item[3].substring(0, 300)}} />...
                <a target="_blank" href={item[10]}>
                    <Image
                      src={item[10]}
                      width={350}
                      height={225}
                      alt="Patented."
                    />
                </a>

              </div>
            )
          })}
        </div>
          
    </main>
    
  )
}
