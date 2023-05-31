let currProject = sampleProject

export async function loadProject(id) {
  'use server'
  const date = new Date()
  const key = 'vT0eAzxpHVDuOw5GxU9TfZcHJ8WTVVbP7BCzljcs';
  console.log(startDate, endDate)
  const res = await fetch(` https://api.nasa.gov/techport/api/projects/${id}?api_key=${key}`);
  const data = await res.json();
  currProject = data;
}
