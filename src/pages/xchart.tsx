import { Metadata } from 'next';
// import MyChart from '../components/MyChart'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useEffect, useState } from 'react'
import React, { useId } from 'react';


export const metadata: Metadata = {
  title: 'Space Cove - Chart',
};


export default function Page() {

  const [data, setData] = useState([])
  
  useEffect(() => setData([
    { name: '478784 (2012 UV136)', ft: 148, vlc: 20478 },
    { name: '(2005 VR7)', ft: 1132, vlc: 28003 },
    { name: '(2008 FC)', ft: 214, vlc: 9946 },
    { name: '(2016 LV10)', ft: 479, vlc: 32021 },
    { name: '(2017 BE32)', ft: 2355, vlc: 11292 },
    { name: '(2017 WD28)', ft: 141, vlc: 34638 },
    { name: '(2018 VS5)', ft: 339, vlc: 29600 },
    { name: '(2019 YM)', ft: 123, vlc: 48610 },
    { name: '(2020 LX)', ft: 209, vlc: 18943 },
    { name: '(2021 AX7)', ft: 1230, vlc: 22143 },
    { name: '620108 (2021 AX7)', ft: 1236, vlc: 22143 },
    { name: '(2023 JK2)', ft: 417, vlc: 17153 },
    { name: '529366 (2009 WM1)', ft: 1614, vlc: 29470 },
    { name: '(2002 JX8)', ft: 1600, vlc: 19074 },
    { name: '(2010 HX107)', ft: 382, vlc: 38864 },
    { name: '(2017 DS109)', ft: 123, vlc: 24058 },
    { name: '(2017 FR91)', ft: 81, vlc: 17770 },
    { name: '(2018 AJ3)', ft: 56, vlc: 11071 },
    { name: '(2018 LH5)', ft: 776, vlc: 32286 },
    { name: '(2019 TR4)', ft: 85, vlc: 35627 },
    { name: '(2020 MA4)', ft: 776, vlc: 48640 },
    { name: '612356 (2002 JX8)', ft: 1614, vlc: 19074 },
    { name: '(2022 KG)', ft: 140, vlc: 35437 },
    { name: '(2022 RO1)', ft: 135, vlc: 16742 },
    { name: '(2022 SZ28)', ft: 1542, vlc: 47695 },
    { name: '(2022 WE1)', ft: 71, vlc: 11781 },
    { name: '(2022 WO7)', ft: 241, vlc: 22942 },
    { name: '(2023 JE2)', ft: 195, vlc: 25473 }
  ]), [])

  return (
  <div>
    <h1>Chart</h1> 
    <BarChart width={400} height={200} data={data}>
      <XAxis dataKey="name" stroke="#8884d8" hide="true"/>
      <YAxis />
      <Tooltip />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <Bar dataKey="ft" fill="#8884d8" barSize={30} />
    </BarChart>
    <BarChart width={400} height={200} data={data}>
      <XAxis dataKey="name" stroke="#8884d8" hide="true"/>
      <YAxis />
      <Tooltip />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <Bar dataKey="vlc" fill="#00ddd8" barSize={30} />
    </BarChart>
   
  </div>
  );
}









 



