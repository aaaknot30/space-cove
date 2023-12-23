import styles from './page.module.css'
import Script from 'next/script';
import '../globals.css'
import Link from 'next/link';
import { Metadata } from 'next';
import MyChart from '../../components/MyChart'
import { Fragment } from 'react';
 

export const metadata: Metadata = {
  title: 'Space Cove - Asteroids',
};


let searchDate
let searchDateYester
async function getData() {
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)
  searchDate = today.toISOString().split('T')[0]
  searchDateYester = yesterday.toISOString().split('T')[0]
  // searchDate = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`
  console.log("searchDate and searchDateYester", searchDate + " and " + searchDateYester)

  const key = 'vT0eAzxpHVDuOw5GxU9TfZcHJ8WTVVbP7BCzljcs';
 
  //const res = await fetch(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${key}`);
  const res = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${searchDateYester}&end_date=${searchDate}&api_key=${key}`,
  { cache: 'no-store' });
  const data = await res.json();
  return data;
}


export default async function Asteroids() {

  const data = await getData();
  let asteroids = data['near_earth_objects'][searchDate]
  asteroids = asteroids.concat(data['near_earth_objects'][searchDateYester])
   console.log("---- end ")
   console.log("asteroids", asteroids.length)

  let dataChart:TmpObj[] = []

  interface TmpObj {
    name: string,
    ft: number,
    vlc: number,
    mdist: number,
  }

   for (const item of asteroids) {
    let tmpObj:TmpObj = {
      name: '',
      ft: 0,
      vlc: 0,
      mdist: 0,

    }
    tmpObj.name = item['name'] 
    // console.log(" ================== " + item['name'] + " ---------------- ", item['estimated_diameter'])
    tmpObj.ft = item['estimated_diameter'] ? item['estimated_diameter']['feet']['estimated_diameter_max'] : "0";
    // tmpObj.ft = 0
    tmpObj.vlc = parseInt(item['close_approach_data'][0]['relative_velocity']['miles_per_hour'])
    tmpObj.mdist = parseInt(item['close_approach_data'][0]['miss_distance']['miles'])
    dataChart.push(tmpObj)
    //console.log(item.estimated_diameter.feet['estimated_diameter_max'].toFixed())
   }

   //console.log(dataChart)



  return (
    <main>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></Script>
        <div className={styles.grid1}>
          <div>
            <h2 className={styles.h2}>Asteroids</h2>
            <p><strong>Date: {searchDate} - {asteroids.length} asteroids observed. </strong> </p>
            <div className={styles.grid2}>
            <div>
                {asteroids.map((item, index) => {
                  const feet = item['estimated_diameter'] ? parseInt(item['estimated_diameter']['feet']['estimated_diameter_max']).toFixed() : "0";
                  // const feet = parseInt("0").toFixed();
                  const feet_commas = feet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  const velocity = parseInt(item['close_approach_data'][0]['relative_velocity']['miles_per_hour']).toFixed();
                  const velocity_commas = velocity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  const distance = parseInt(item['close_approach_data'][0]['miss_distance']['miles']).toFixed();
                  const distance_commas = distance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  //console.log(commas); 
                  return (
                    <div key={index}>
                      <p>Name: {item['name']}</p>
                      <ul className={styles.card} key={index}>
                        {/* <p>Id: {item.id}</p> */}
                        <li>Estimated Max. Diameter (ft): {feet_commas} ft</li>
                        <li>Relative Velocity (mph): {velocity_commas} mph</li>
                        <li>Distance from Earth: {distance_commas} miles</li>
                      </ul>
                    </div>
                  )
                })}
            </div>
            <div>
                <h2 className={styles.h2}>Asteroids size in feet</h2> <MyChart mode='ft' dataChart={dataChart} />
                <br />
                <h2 className={styles.h2}>Asteroids speed in mph</h2> <MyChart mode='vlc' dataChart={dataChart} />
                <br />
                <h2 className={styles.h2}>Asteroids miles from Erath</h2> <MyChart mode='mdist' dataChart={dataChart} />
            </div>
            </div>
          </div>
          <div className={styles.sideBackground}>
                  
          </div>

        </div>
          
    </main>
  )
}
