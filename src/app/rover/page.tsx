import styles from './page.module.css'
import '../globals.css'
import { Link } from 'next/link';
import { Metadata } from 'next';
import Image from 'next/image'
import { revalidatePath } from "next/cache";


export const metadata: Metadata = {
  title: 'Space Cove - Mars Rover',
};


const searchSol = []
const roverList = []
let sol
let rover

async function formSubmit(formData: FormData) {
  'use server'
  console.log("--- formsubmit")
  console.log(formData)
  const sol = formData.get("sol") as int;
  const vehicle = formData.get("rover") as string;
  console.log("--- sol")
  console.log(sol)
  searchSol.unshift(sol)
  roverList.unshift(vehicle)
  revalidatePath("/");
}

const roverGroup = ['curiosity','opportunity','spirit']


async function getData() {
  console.log("--------- --------- getData")
  console.log("searchSol", searchSol)
  sol = searchSol[0] ? searchSol[0] : Math.floor(Math.random() * 99) + 1;
  rover = roverList[0] ? roverList[0] : roverGroup[(Math.floor(Math.random() * 2))]
  const key = 'vT0eAzxpHVDuOw5GxU9TfZcHJ8WTVVbP7BCzljcs';
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${key}`
  console.log(url)
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.json();;
}


export default async function RoverCam() {

  const data = await getData();
  const photos = data.photos

  return (
    <main>
        <div className={styles.flex}>
          <h2>Mars Rover Cams</h2>
          <form action={formSubmit}  className={styles.flex}>
            <label for="day"><strong>Day of Mission:</strong>  <input
                type="text"
                name="sol" 
                id="day"
                width="100px"
                placeholder="1-1000" /></label>
            <label for="model"><strong>Rover model:</strong>  
             <select
                name="rover"
                id="model">
                  <option value="curiosity">curiosity</option>
                  <option value="opportunity">opportunity</option>
                  <option value="spirit">spirit</option>
            </select></label>
            <button
                type="submit">
                Search Rover Cam
            </button>
          </form>
        </div>
        <p>Day: {sol} | Rover: {rover} </p>
       
        <div className={styles.grid}>

          {photos.slice(0,16).map((item, index) => {
            
            return (
              <div key={index}>
                <p>{item.camera.full_name} - {item.earth_date}</p>
                <Image
                  src={item.img_src}
                  width={300}
                  height={300}
                  alt="Cam"
                  />
              </div>
            )
          })}

        </div>
          
    </main>
  )
}
