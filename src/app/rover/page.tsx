import styles from './page.module.css'
import '../globals.css'
import Link from 'next/link';
import { Metadata } from 'next';
import Image from 'next/image'
import { revalidatePath } from "next/cache";
import defaultResponse from '../../json/marsCam.json'


export const metadata: Metadata = {
  title: 'Space Cove - Mars Rover',
};



let sol = Math.floor(Math.random() * 99) + 1

const roverGroup = ['curiosity','opportunity','spirit']
let rover = roverGroup[(Math.floor(Math.random() * 2))]



async function formSubmit(formData: FormData) {
  'use server'
  sol = parseInt(formData.get("sol") as string);
  rover = formData.get("rover") as string;
  revalidatePath("/");
}



async function getData() {
  const key = 'vT0eAzxpHVDuOw5GxU9TfZcHJ8WTVVbP7BCzljcs';
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${key}`
  console.log(url)
  const res = await fetch(url);
  let data = await res.json()
  if (data.results.length === 0) {
    data = defaultResponse
  }
  return data;
}



export default async function RoverCam() {

  const data = await getData();
  const photos = data.photos

  return (
    <main>
        <div className={styles.flex}>
          <h2 className={styles.h2}>Mars Rover Cams</h2>
          <form action={formSubmit}  className={styles.flex}>
            <label htmlFor="day"><strong>Day of Mission:</strong>  <input
                type="text"
                name="sol" 
                id="day"
                width="100px"
                placeholder="1-1000" /></label>
            <label htmlFor="model"><strong>Rover model:</strong>  
             <select
                name="rover"
                id="model">
                  <option value="curiosity">curiosity</option>
                  <option value="opportunity">opportunity</option>
                  <option value="spirit">spirit</option>
            </select></label>
            <button
                className={styles.button}
                type="submit">
                Search Rover Cam
            </button>
          </form>
        </div>
        <p>Day: {sol} | Rover: {rover} </p>
       
        <div className={styles.grid}>

          {photos.slice(0,20).map((item, index) => {
            
            return (
              <div key={index}>
                <a target="_blank" href={item.img_src}>
                  <p>{item.camera.full_name} - {item.earth_date}</p>
                  <Image
                    src={item.img_src}
                    width={300}
                    height={300}
                    alt="Cam"
                    />
                  </a> 
              </div>
            )
          })}

        </div>
          
    </main>
  )
}
