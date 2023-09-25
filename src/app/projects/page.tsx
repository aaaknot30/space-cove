import styles from './page.module.css'
import '../globals.css'
import Link from 'next/link';
import { Metadata } from 'next';
import data1 from '../../json/projects.json'
import { Fragment } from 'react';
import { revalidatePath } from "next/cache";
 

export const metadata: Metadata = {
  title: 'Space Cove - Asteroids',
};

const projects = data1.projects
let searchId
let projectData

async function formSubmit(formData: FormData) {
  'use server'
  console.log("--- formsubmit")
  console.log(formData)
  const id = formData.get("id") as string;
  console.log("--- id")
  console.log(id)
  searchId = id
  revalidatePath("/");
}

async function getProject() {
  const queryId = searchId ? searchId : projects[Math.floor(Math.random() * 100)].projectId
  const key = 'vT0eAzxpHVDuOw5GxU9TfZcHJ8WTVVbP7BCzljcs';
  // https://api.nasa.gov/techport/api/projects/94064?api_key=vT0eAzxpHVDuOw5GxU9TfZcHJ8WTVVbP7BCzljcs
  const res = await fetch(`https://techport.nasa.gov/api/projects/${queryId}?api_key=${key}`);
  const data = await res.json();
  const project = data.project
  console.log(project.title)
  return project;
}


async function getData() {
  // 'use server'
  // const date = new Date()
  // const key = 'vT0eAzxpHVDuOw5GxU9TfZcHJ8WTVVbP7BCzljcs';
  // const startDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()-1}`
  // const endDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
  // console.log(startDate, endDate)
  // const res = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${key}`);
  // const data = await res.json();
  // return data;
}


export default async function Projects({searchParams}) {
  console.log("----------  searchParams")
  console.log(searchParams.id)


  //const data = await getData();
  projectData = await getProject()
  //console.log(projectData)
  
  return (
    <main>
        <div className={styles.grid1}>
          <div>
            <h2 className={styles.h2}>NASA Projects</h2>
            <div className={styles.grid2}>
            <div>  
              <form className={styles.form} action={formSubmit}>
              <select 
                name="id"
                id="id">
                  <option > - Select a Project - </option>
                  {projects.map((item, index) => {
                    return (
                      
                        <option key={index} value={item.projectId}> {item.projectId}</option>
                      
                    )
                  })}
              </select>  
              <input className={styles.button} type="submit" />
              </form>
            </div>

            <div>
              <h3>{projectData.title} - {projectData.projectId}</h3>
              <p><strong>Benefits:</strong></p><div dangerouslySetInnerHTML={{__html: projectData.benefits}} /> 
              <p><strong>Description:</strong></p><div dangerouslySetInnerHTML={{__html: projectData.description}} />
              <p>{projectData.statusDescription}: {projectData.startYear} - {projectData.startYear}</p> 
            </div>

            </div>
          </div>
          <div className={styles.sideBackground}>
                  
          </div>

        </div>  
    </main>
  )
}
