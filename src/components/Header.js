import Link from 'next/link'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src="https://tether.to/images/logoGreen.svg" alt="USD₮ Logo" className={styles.logo} />
        <span>Flash USD₮ Sender</span>
      </div>
      <nav>
        <Link href="#features">Features</Link>
        <Link href="#how-it-works">How It Works</Link>
        <Link href="#pricing">Pricing</Link>
      </nav>
    </header>
  )
}