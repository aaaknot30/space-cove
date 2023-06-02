'use client'; // Error components must be Client Components

import './globals.css'
import { useEffect } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

 
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
    <div className="errorGroup">
      <br />
      <br />
      <h2>Ooops! Looks like the search parameter was not found. Try starting over.</h2>
      <br />
      <h3><Link href="/">Home</Link></h3> <br />
 
    </div>
  );
}