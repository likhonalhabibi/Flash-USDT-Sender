import styles from './HowItWorks.module.css'

const Step = ({ num, title, text }) => {
  return (
    <div className={styles.step}>
      <span className={styles.stepNumber}>{num}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  )
}

export default function HowItWorks() {
  return (
    <section className={styles.howItWorks} id="how-it-works">
      <h2>Get Started in 3 Simple Steps</h2>
      <div className={styles.stepsContainer}>
        <Step num="1" title="Get a License" text="Purchase a 90-day license to get full access to the sender." />
        <Step num="2" title="Connect Your Wallet" text="Securely connect your MetaMask or other Web3 wallet." />
        <Step num="3" title="Send USD₮" text="Enter the recipient and amount, and confirm the transaction." />
      </div>
    </section>
  )
}