'use client'; // Error components must be Client Components
 
import { useEffect } from 'react';
import Link from 'next/link';
 
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
      <br />
      <br />
      <h2>Ooops! Looks like the search parameter was not found. Try starting over.</h2>
      <br /><Link href="/">Home</Link><br />
      <Link href="/apod">Daily Pic</Link><br />
      <Link href="/rover">Rover</Link><br />
      <Link href="/search">Media Search</Link><br />
      <Link href="/asteroids">Daily Asteroids</Link><br />
      <Link href="/patent">Patents Search</Link><br />
      <Link href="/projects">Projects Search</Link><br />
      
    </div>
  );
}