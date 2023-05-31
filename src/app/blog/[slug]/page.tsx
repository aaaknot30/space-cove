import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Space Cove - SLUG',
};



export default function Page({ params }) {
  console.log("---------- params");
  console.log(params.slug);

  return (
  <div>
    
    <h1>My Post</h1> 
    <p>Params: {params.slug} </p> 
    
    
  </div>
  );
}



