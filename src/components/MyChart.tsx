'use client'
import { BarChart, Bar, ScatterChart, Scatter, ZAxis, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { useEffect, useState } from 'react'
import styles from './page.module.css'

export default function MyChart({mode, dataChart}) {

  const [data, setData] = useState([])
  useEffect(() => setData(dataChart), [])

  return (
  <div className={styles.graph}>
      {mode === 'ft' && <BarChart width={500} height={200} data={data}>
        <XAxis dataKey="name" stroke="#8884d8" hide="true" unit="ft" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Bar dataKey="ft" fill="#8884d8" barSize={30} />
      </BarChart>
      }
      <br />
      {mode === 'vlc' && <BarChart width={500} height={200} data={data} >
        <XAxis dataKey="name" stroke="#8884d8" hide="true" unit="vlc" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Bar dataKey="vlc" fill="#00ddd8" barSize={30} />
      </BarChart>
      }
    <br />
    {mode === 'mdist' && <BarChart width={500} height={200} data={data} margin={{top: 0, right: 0, bottom: 0, left: 20}}>
        <XAxis dataKey="name" stroke="#8884d8" hide="true" unit="dist" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Bar dataKey="mdist" fill="#22dd88" barSize={30} />
    </BarChart>}

    </div>
  );
}






 
