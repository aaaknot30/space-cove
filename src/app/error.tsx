'use client'; // Error components must be Client Components
 
import { useEffect } from 'react';
 
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
 
  return (
    <div>
      <h1>Ooops! Looks like the search parameter was not found. Try starting over.</h1>
      
    </div>
  );
}