import Image from 'next/image'
import styles from './page.module.css'
import '../globals.css'
import Link from 'next/link';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Space Cove - APOD',
};

const BASE_URL = process.env.BASE_URL;

async function getData() {

  // const response = await fetch(`${BASE_URL}/api/dailyPic`, { next: { revalidate: 3600 } });
  // return response.json();

  const key = 'vT0eAzxpHVDuOw5GxU9TfZcHJ8WTVVbP7BCzljcs';
  const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${key}`);
  const data = await res.json();
  return data

}

export default async function Apod() {
  let imageSrc = null  
  const data = await getData();
  imageSrc = data.hdurl
  return (
    <main>
      
        <h2>Space Cove - Apod</h2>
        <p>{data.title}</p>
        <div className={styles.background}>
          <div>
            <p>{data.explanation}</p>
            <p>Date: {data.date}</p>
          </div>
            <a target="_blank" href={data.url}>
              <Image
              src={data.media_type === 'image' ? data.url : '/img/xxvideo_placeholder.jpg'}
              width={500}
              height={500}
              alt="Picture"
          />
          </a> 
      </div>
    </main>
  )
}
