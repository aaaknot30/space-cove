import styles from './page.module.css'
import '../globals.css'
import Link from 'next/link';
import { Metadata } from 'next';
import Image from 'next/image'
import { revalidatePath } from "next/cache";


export const metadata: Metadata = {
  title: 'Space Cove - Media Search',
};


const searchWords = ['heat', 'moon', 'planet', 'solar']
let search = searchWords[Math.floor(Math.random() * 3)]
let isVideoOnly = "false"

async function formSubmit(formData: FormData) {
  'use server'
  const searchWord = formData.get("search") as string;
  const isVideo = formData.get("isVideo") as string;
  isVideoOnly = isVideo
  search = searchWord
  revalidatePath("/");
}

async function getData() {
  const key = 'vT0eAzxpHVDuOw5GxU9TfZcHJ8WTVVbP7BCzljcs';
  const url = `https://images-api.nasa.gov/search?q=${search}`
  console.log(url)
  const res = await fetch(url);
  return res.json();;
}


export default async function Search() {


  console.log('---------- searchResponse')
  //console.log(searchResponse)
  const data = await getData();
  const photos = data.photos
  let collection = isVideoOnly ? 
    data.collection.items.filter(item => item.data[0].media_type === 'video') :
    data.collection.items.filter((item, index) => index < 21)


  return (
    <main>
        <div className={styles.flex}>
          <h2 className={styles.h2}>Media Search</h2>
          <form action={formSubmit}  className={styles.flex}>
            <input
                type="text"
                name="search" 
                id="search"
                width="100px"
                placeholder="Search" />
            <label 
                htmlFor="isVideo"> Video only
                <input 
                    type="checkbox"
                    name="isVideo"
                    id="isVideo" 
                    value="false" />
            </label>
            <button
                className={styles.button}
                type="submit">
                Search
            </button>
          </form>
        </div>

        <div className={styles.grid}>
          {collection.map((item, index) => {

            return (
              
              <div key={index}>
                <p><strong>{item.data[0].title}</strong> </p>
                {item.links && 
                  <a target="_blank" href={item.data[0].media_type === 'video' ? item.links[0].href.replace('thumb.jpg', 'preview.mp4') : 
                  item.links[0].href.replace('thumb.jpg', 'orig.jpg')}>
                    <Image
                      src={item.links[0].href}
                      width={350}
                      height={200}
                      alt="Cam"
                      />
                  </a>}
                <p>Type: {item.data[0].media_type}</p>
                <p>{item.data[0].description.substring(0, 450)}...</p>
                
                  {item.data[0].media_type === 'audio' && item.links && 
                  <a target="_blank" href={item.links[0].href.replace('thumb.jpg', 'orig.mp3')}>More</a>}
              </div>

            )
          })}

        </div>
          
    </main>
    
  )
}
