import { useState, useEffect } from 'react'
import { BrowserProvider, Contract, formatUnits, parseUnits, isAddress } from 'ethers'
import styles from './App.module.css'

export default function App({ isOpen, onOpen, onClose }) {
  const [hasAccess, setHasAccess] = useState(false)
  const [userAddress, setUserAddress] = useState('')
  const [usdtBalance, setUsdtBalance] = useState('')
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [usdtContract, setUsdtContract] = useState(null)

  const usdtAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7" // Mainnet USDT
  const usdtAbi = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)",
    "function balanceOf(address) view returns (uint)",
    "function transfer(address to, uint amount) returns (bool)",
  ]

  useEffect(() => {
    const checkAccess = () => {
      const license = localStorage.getItem('usdtsenderLicense')
      if (license) {
        const { expiry } = JSON.parse(license)
        if (new Date().getTime() < expiry) {
          setHasAccess(true)
        } else {
          localStorage.removeItem('usdtsenderLicense')
          setHasAccess(false)
        }
      }
    }
    checkAccess()
  }, [])

  const grantAccess = () => {
    const expiry = new Date().getTime() + 90 * 24 * 60 * 60 * 1000 // 90 days
    localStorage.setItem('usdtsenderLicense', JSON.stringify({ expiry }))
    setHasAccess(true)
    onClose()
  }

  const handleConnectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const web3Provider = new BrowserProvider(window.ethereum)
        setProvider(web3Provider)
        const web3Signer = await web3Provider.getSigner()
        setSigner(web3Signer)
        const address = await web3Signer.getAddress()
        setUserAddress(address)
        const contract = new Contract(usdtAddress, usdtAbi, web3Signer)
        setUsdtContract(contract)
        updateBalance(contract, address)
      } catch (error) {
        console.error("Wallet connection failed:", error)
      }
    } else {
      alert('Please install MetaMask!')
    }
  }

  const updateBalance = async (contract, address) => {
    try {
      const balance = await contract.balanceOf(address)
      const decimals = await contract.decimals()
      setUsdtBalance(formatUnits(balance, decimals))
    } catch (error) {
      console.error("Failed to update balance:", error)
    }
  }

  const handleSend = async (event) => {
    event.preventDefault()
    const recipient = event.target.recipient.value
    const amount = event.target.amount.value

    if (!isAddress(recipient)) {
      alert("Invalid recipient address.")
      return
    }

    try {
      const decimals = await usdtContract.decimals()
      const parsedAmount = parseUnits(amount, decimals)

      alert("Sending transaction...")
      const tx = await usdtContract.transfer(recipient, parsedAmount)
      await tx.wait()

      alert("Transaction successful!")
      updateBalance(usdtContract, userAddress)
    } catch (error) {
      console.error("Transaction failed:", error)
      alert("Transaction failed.")
    }
  }

  return (
    <section className={styles.appSection} id="app-section">
      <div className={styles.appContainer}>
        {!hasAccess && (
          <div className={styles.lockOverlay}>
            <span>🔒</span>
            <h2>Get Access to Use the Sender</h2>
            <button className={styles.ctaButton} onClick={onOpen}>
              Purchase License
            </button>
          </div>
        )}

        <div className={styles.senderTool}>
          <h2>Flash USD₮ Sender</h2>
          {!userAddress ? (
            <button className={styles.ctaButton} onClick={handleConnectWallet} disabled={!hasAccess}>
              Connect Wallet
            </button>
          ) : (
            <div>
              <p>Your Address: {userAddress}</p>
              <p>USD₮ Balance: {usdtBalance}</p>
            </div>
          )}
          <form onSubmit={handleSend}>
            <label>
              Recipient Address
              <input name="recipient" placeholder="0x..." disabled={!hasAccess} />
            </label>
            <label>
              Amount to Send
              <input name="amount" placeholder="0.00" disabled={!hasAccess} />
            </label>
            <button type="submit" disabled={!hasAccess}>Send USD₮</button>
          </form>
        </div>
      </div>

      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.closeButton} onClick={onClose}>&times;</span>
            <h2>Secure Checkout</h2>
            <p>You are purchasing a 90-day license for Flash USD₮ Sender for $250 USD.</p>
            <p><em>This is a simulated payment gateway. No real transaction will occur.</em></p>
            <button className={styles.ctaButton} onClick={grantAccess}>
              Confirm Payment
            </button>
          </div>
        </div>
      )}
    </section>
  )
}