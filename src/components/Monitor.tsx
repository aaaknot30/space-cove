'use client';
import { usePathname } from 'next/navigation';

 
export default function Monitor() {
  const pathname = usePathname();
  console.log("----- pathname -----")
  console.log(pathname)
 
  return (
    <button type="button" onClick={() => router.push('/apod')}>
      Dashboard
    </button>
  );
}


