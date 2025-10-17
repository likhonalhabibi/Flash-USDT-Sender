import styles from './Pricing.module.css'

export default function Pricing({ onOpen }) {
  return (
    <section className={styles.pricing} id="pricing">
      <div className={styles.pricingCard}>
        <h2>Unlock Full Power</h2>
        <p className={styles.price}>
          $250<span> USD</span>
        </p>
        <ul>
          <li>✓ Full Access to All Features</li>
          <li>✓ 90-Day Validity</li>
          <li>✓ 24/7 Customer Support</li>
          <li>✓ Secure & Anonymous</li>
        </ul>
        <button className={styles.ctaButton} onClick={onOpen}>
          Get Access Now!
        </button>
      </div>
    </section>
  )
}