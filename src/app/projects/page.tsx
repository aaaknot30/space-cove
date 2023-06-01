import styles from './page.module.css'
import '../globals.css'
import Link from 'next/link';
import { Metadata } from 'next';
import data1 from '../../json/projects'
import { Fragment } from 'react';
import { revalidatePath } from "next/cache";
 

export const metadata: Metadata = {
  title: 'Space Cove - Asteroids',
};


const searchId = ['94064']
let projectData

async function formSubmit(formData: FormData) {
  'use server'
  console.log("--- formsubmit")
  console.log(formData)
  const id = formData.get("id") as string;
  console.log("--- id")
  console.log(id)
  searchId.unshift(id)
  revalidatePath("/");
}

async function getProject() {
  const queryId = searchId[0] ? searchId[0] : '94064'
  const key = 'vT0eAzxpHVDuOw5GxU9TfZcHJ8WTVVbP7BCzljcs';
  // https://api.nasa.gov/techport/api/projects/94064?api_key=vT0eAzxpHVDuOw5GxU9TfZcHJ8WTVVbP7BCzljcs
  const res = await fetch(`https://api.nasa.gov/techport/api/projects/${queryId}?api_key=${key}`);
  const data = await res.json();
  const project = data.project
  projectData = project
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
  const projects = data1.projects
  projectData = await getProject()
  //console.log(projectData)
  
  return (
    <main>
        <div className={styles.grid1}>
          <div>
            <h2 className={styles.h2}>Space Cove - Projects</h2>
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
              <input type="submit" />
              </form>
            </div>

            <div>
              <h3>{projectData.title} - {projectData.projectId}</h3>
              <p><strong>Benefits:</strong> {projectData.benefits}</p> 
              <p><strong>Description:</strong> {projectData.description}</p> 
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
