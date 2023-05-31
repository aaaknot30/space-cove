import './globals.css'
import Image from 'next/image'
import Link from 'next/link';
import styles from './page.module.css'
import Script from 'next/script';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faTruckPickup, faVideo, faMeteor, faLightbulb, faWrench } from '@fortawesome/free-solid-svg-icons'



export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.section1}>
        <h1 className="title1">Space Cove</h1>
      </section>
      <section className={styles.section2}>

      </section>
      <section className={styles.section3}>
          <h1 className="title2">Explore. Discover. Learn.</h1>
        
          
          <Link href="/apod">
            <div className="card">
              <h2><strong>Pic of the Day</strong></h2>
              <FontAwesomeIcon className="icon" icon={faCamera} size = {'xl'} />
            </div>
          </Link> 
          <Link href="/rover">
            <div className="card">
              <h2><strong>Rover Photos</strong></h2>
              <FontAwesomeIcon className="icon" icon={faTruckPickup} size = {'xl'} />
            </div> 
          </Link>
          <Link href="/search">
            <div className="card">
              <h2><strong>Media Search</strong></h2>
              <FontAwesomeIcon className="icon" icon={faVideo} size = {'xl'} />
            </div> 
          </Link>


          <Link href="/asteroids">  
            <div className="card">
              <h2><strong>Daily Asteroids</strong></h2>
              <FontAwesomeIcon className="icon" icon={faMeteor} size = {'xl'} />
            </div> 
          </Link>
          <Link href="/patent">
            <div className="card">
              <h2><strong>Patents</strong></h2>
              <FontAwesomeIcon className="icon" icon={faLightbulb} size = {'xl'} />
            </div> 
          </Link>
          <Link href="/projects">
            <div className="card">
              <h2><strong>Projects</strong></h2>
              <FontAwesomeIcon className="icon" icon={faWrench} size = {'xl'} />
            </div> 
          </Link>


      </section>
      <section className={styles.section4}>
      <Image
        src={'/img/nasa_logo.jpg'}
        width={85}
        height={70}
        alt="NASA Logo"
        />
        <h2>NASA Open API</h2>
        <p>Space Cove uses the NASA Open API for much of its content. <br /> Space Cove organizes and provides access to this vast amount of NASA data. <br /> The objective of this NASA Open API is to make NASA data and imagery accessible to developers.</p>
      </section>
      <section className={styles.section5}>
        <p>By Kyle Larson</p>
      </section>
     
    </main>
  )
}
