import styles from './Features.module.css'

const Feature = ({ title, text, icon }) => {
  return (
    <div className={styles.featureCard}>
      <div className={styles.icon}>{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  )
}

export default function Features() {
  return (
    <section className={styles.features} id="features">
      <h2>Why Choose Us?</h2>
      <div className={styles.featuresGrid}>
        <Feature
          icon="🛡️"
          title={'Secure Transactions'}
          text={'Leverage the power of Web3 and your own wallet for maximum security. Your keys never leave your device.'}
        />
        <Feature
          icon="⚡"
          title={'Lightning Fast'}
          text={'Our optimized process ensures your USD₮ transfers are sent to the blockchain without any delay.'}
        />
        <Feature
          icon="⚙️"
          title={'Multi-Platform'}
          text={'Compatible with any browser that supports Web3 wallets like MetaMask, Trust Wallet, and more.'}
        />
        <Feature
          icon="🎧"
          title={'24/7 Support'}
          text={'Our dedicated support team is available around the clock to assist you with any issues.'}
        />
      </div>
    </section>
  )
}