import styles from './Hero.module.css'

export default function Hero({ onOpen }) {
  return (
    <section className={styles.hero}>
      <h1>Instant & Secure USD₮ Transfers</h1>
      <p>Your reliable solution for sending Tether (USD₮) across the blockchain, fast and securely.</p>
      <button className={styles.ctaButton} onClick={onOpen}>
        Get Access Now!
      </button>
    </section>
  )
}