import './globals.css'
import styles from './styles.module.css';
import { Inter } from 'next/font/google';
import { Roboto } from 'next/font/google';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
 

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Space Cove',
  description: 'Web App NASA api',
}


function Nav() {
  const pathname = usePathname();
  return (
    <nav className={styles.nav}>
      <Link className={styles.link} href="/">Home</Link>
      <Link className={styles.link} href="/apod">Daily Pic</Link>
      <Link className={styles.link} href="/rover">Rover</Link>
      <Link className={styles.link} href="/search">Media Search</Link>
      <Link className={styles.link} href="/asteroids">Daily Asteroids</Link>
      <Link className={styles.link} href="/patent">Patents Search</Link>
      <Link className={styles.link} href="/projects">Projects Search</Link>
    </nav>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
        </body>
    </html>
  )
}


