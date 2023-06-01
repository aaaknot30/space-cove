import styles from './page.module.css'
import Script from 'next/script';
import '../globals.css'
import Link from 'next/link';
import { Metadata } from 'next';
import asteroids from '../../json/asteroids2'
import MyChart from '../../components/MyChart'
import { Fragment } from 'react';
 

export const metadata: Metadata = {
  title: 'Space Cove - Asteroids',
};


async function getData() {
  const date = new Date()
  const key = 'vT0eAzxpHVDuOw5GxU9TfZcHJ8WTVVbP7BCzljcs';
  const startDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()-1}`
  const endDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
  console.log(startDate, endDate)
  const res = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${key}`);
  const data = await res.json();
  return data;
}


export default async function Asteroids() {


  const data = await getData();
  
  console.log("------------------- asteroids")
  let asteroids = []
  let legend

  for (const [key, value] of Object.entries(data.near_earth_objects)) {
    asteroids = asteroids.concat(Array.from(value))
    legend = key
  }

   console.log("---- end ")
   console.log("asteroids", asteroids.length)

  let dataChart = []

   for (const item of asteroids) {
    console.log(typeof parseInt(parseInt(item.close_approach_data[0].relative_velocity['miles_per_hour']).toFixed()))
    const tmpObj = {}
    tmpObj.name = item.name
    tmpObj.ft = parseInt(item.estimated_diameter.feet['estimated_diameter_max'].toFixed())
    tmpObj.vlc = parseInt(parseInt(item.close_approach_data[0].relative_velocity['miles_per_hour']).toFixed())
    tmpObj.mdist = parseInt(parseInt(item.close_approach_data[0].miss_distance['miles']).toFixed())
    dataChart.push(tmpObj)
    //console.log(item.estimated_diameter.feet['estimated_diameter_max'].toFixed())
   }

   console.log(dataChart)



  return (
    <main>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></Script>
        <div>
          <h2>Space Cove - Asteroids</h2>
          <p><strong>Date: {legend} - {asteroids.length} asteroids observed. </strong> </p>
          <h3>Asteroids</h3>
        </div>
       
        <div className={styles.background}>
            <div>
                {asteroids.map((item, index) => {
                  const feet = parseInt(item.estimated_diameter.feet['estimated_diameter_max']).toFixed();
                  const feet_commas = feet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  const velocity = parseInt(item.close_approach_data[0].relative_velocity['miles_per_hour']).toFixed();
                  const velocity_commas = velocity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  const distance = parseInt(item.close_approach_data[0].miss_distance['miles']).toFixed();
                  const distance_commas = distance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  //console.log(commas); 
                  return (
                    <div key={index}>
                      <p>Name: {item.name}</p>
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
          
    </main>
  )
}