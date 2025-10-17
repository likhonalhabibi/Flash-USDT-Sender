# Flash USDT Sender

Flash USDT Sender is a web-based application that allows you to quickly and securely send USDT (Tether) to any Ethereum address. It is designed to be simple and intuitive, leveraging your existing browser wallet (like MetaMask) to handle transactions securely without ever needing access to your private keys.

## Features

- **Secure Transactions**: Connects with your browser wallet (e.g., MetaMask) to sign and send transactions. Your private keys never leave your wallet.
- **User-Friendly Interface**: A clean and simple UI for sending USDT with just a few clicks.
- **Real-Time Balance Updates**: Automatically fetches and displays your current USDT balance.
- **Transaction Status**: Provides real-time feedback on the status of your transaction.

## How to Use

To use the Flash USDT Sender, you do not need to install any software. Simply open the `index.html` file in a web browser that has a wallet extension like MetaMask installed.

### Prerequisites

- A modern web browser (Chrome, Firefox, Brave, etc.).
- The [MetaMask](https://metamask.io/) browser extension (or another compatible wallet).
- An account in your wallet with some ETH (for gas fees) and USDT on the Ethereum mainnet.

### Sending USDT

1. **Open the Application**: Open the `index.html` file in your browser.
2. **Connect Your Wallet**: Click the **Connect Wallet** button. Your wallet extension will prompt you to approve the connection.
3. **Enter Transaction Details**:
   - In the "Recipient Address" field, enter the Ethereum address you want to send USDT to.
   - In the "Amount to send" field, enter the amount of USDT you wish to send.
4. **Send the Transaction**: Click the **Send USDT** button. Your wallet will pop up again to ask you to confirm the transaction details and gas fees.
5. **Confirmation**: After you approve the transaction, the application will show a confirmation message once the transaction is successfully processed on the blockchain.

## How It Works

This application is built using HTML, CSS, and JavaScript, with the `ethers.js` library to interact with the Ethereum blockchain. It connects to the standard USDT smart contract on the Ethereum mainnet to initiate transfers. All operations are performed on the client-side, ensuring that your wallet credentials remain secure.

## Disclaimer

This is a simple tool for demonstration purposes. Always double-check the recipient address and transaction amount before confirming any transaction in your wallet. The creators of this tool are not responsible for any lost funds.