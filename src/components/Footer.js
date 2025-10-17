import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        Powered by{' '}
        <Link href="https://t.me/RecentCoders" target="_blank" rel="noopener noreferrer">
          RecentCoders
        </Link>
      </p>
      <div className={styles.socialLinks}>
        {/* Inlined SVGs for simplicity */}
        <Link href="#">
          <svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M9.417 15.181L12.5 12.098 9.417 9.016l-1.414 1.414 2.086 2.086-2.086 2.086zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
        </Link>
        <Link href="#">
        <svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.67.88-.53 1.56-1.37 1.88-2.38-.83.49-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.27 0 .34.04.67.11.98-3.56-.18-6.72-1.89-8.83-4.47-.37.63-.58 1.37-.58 2.15 0 1.48.75 2.79 1.9 3.55-.7-.02-1.37-.22-1.95-.53v.05c0 2.07 1.48 3.8 3.44 4.2-.36.1-.74.15-1.13.15-.28 0-.55-.03-.81-.08.54 1.69 2.1 2.93 3.96 2.96-1.47 1.15-3.32 1.83-5.33 1.83-.35 0-.69-.02-1.03-.06 1.9 1.23 4.16 1.95 6.58 1.95 7.89 0 12.21-6.54 12.21-12.21 0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.22z"/></svg>
        </Link>
        <Link href="#">
        <svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M20.3 4.89c-1.38 0-2.6.56-3.54 1.46L12 10.17l-4.76-3.82C6.3 5.45 5.08 4.89 3.7 4.89 2.03 4.89 1 6.02 1 7.69c0 .8.42 1.52 1.07 1.98L12 16.5l9.93-6.83c.65-.46 1.07-1.18 1.07-1.98 0-1.67-1.03-2.8-2.7-2.8z"/></svg>
        </Link>
      </div>
      <p>&copy; {new Date().getFullYear()} Flash USD₮ Sender. All Rights Reserved.</p>
    </footer>
  )
}