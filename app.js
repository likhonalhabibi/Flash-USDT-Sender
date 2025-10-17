document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element Selections ---
    const appContainer = document.getElementById('app-container');
    const connectWalletBtn = document.getElementById('connectWallet');
    const sendButton = document.getElementById('sendButton');
    const senderInfo = document.getElementById('senderInfo');
    const sendForm = document.getElementById('sendForm');
    const userAddressSpan = document.getElementById('userAddress');
    const usdtBalanceSpan = document.getElementById('usdtBalance');
    const recipientAddressInput = document.getElementById('recipientAddress');
    const sendAmountInput = document.getElementById('sendAmount');
    const transactionStatus = document.getElementById('transactionStatus');

    // --- Modal and Access Control Elements ---
    const paymentModal = document.getElementById('payment-modal');
    const closeModalBtn = document.querySelector('.close-button');
    const confirmPaymentBtn = document.getElementById('confirm-payment-button');
    const getAccessButtons = [
        document.getElementById('get-access-hero'),
        document.getElementById('get-access-overlay'),
        document.getElementById('get-access-pricing')
    ];

    // --- Ethers.js and Contract Details ---
    let provider;
    let signer;
    let usdtContract;
    const usdtAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7"; // Mainnet USDT
    const usdtAbi = [
        "function name() view returns (string)",
        "function symbol() view returns (string)",
        "function decimals() view returns (uint8)",
        "function balanceOf(address) view returns (uint)",
        "function transfer(address to, uint amount) returns (bool)",
    ];

    // --- Access Control Logic ---
    const checkAccess = () => {
        const license = localStorage.getItem('usdtSenderLicense');
        if (license) {
            const { expiry } = JSON.parse(license);
            if (new Date().getTime() < expiry) {
                appContainer.classList.add('unlocked');
                return true;
            } else {
                localStorage.removeItem('usdtSenderLicense');
            }
        }
        appContainer.classList.remove('unlocked');
        return false;
    };

    const grantAccess = () => {
        const expiry = new Date().getTime() + (90 * 24 * 60 * 60 * 1000); // 90 days from now
        const license = { granted: true, expiry };
        localStorage.setItem('usdtSenderLicense', JSON.stringify(license));
        checkAccess();
    };

    // --- Modal Handling ---
    const openModal = () => paymentModal.classList.remove('hidden');
    const closeModal = () => paymentModal.classList.add('hidden');

    getAccessButtons.forEach(btn => btn.addEventListener('click', openModal));
    closeModalBtn.addEventListener('click', closeModal);
    confirmPaymentBtn.addEventListener('click', () => {
        grantAccess();
        closeModal();
    });

    // --- Wallet and Transaction Logic ---
    connectWalletBtn.addEventListener('click', async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                provider = new ethers.providers.Web3Provider(window.ethereum);
                signer = provider.getSigner();
                const userAddress = await signer.getAddress();

                userAddressSpan.textContent = userAddress;
                senderInfo.classList.remove('hidden');
                sendForm.classList.remove('hidden');
                connectWalletBtn.classList.add('hidden');

                usdtContract = new ethers.Contract(usdtAddress, usdtAbi, signer);
                updateBalance(userAddress);
            } catch (error) {
                console.error("Wallet connection failed:", error);
                transactionStatus.textContent = "Failed to connect wallet.";
            }
        } else {
            transactionStatus.textContent = "Please install MetaMask!";
        }
    });

    sendButton.addEventListener('click', async () => {
        const recipient = recipientAddressInput.value;
        const amount = sendAmountInput.value;

        if (!ethers.utils.isAddress(recipient)) {
            transactionStatus.textContent = "Invalid recipient address.";
            return;
        }

        try {
            const decimals = await usdtContract.decimals();
            const parsedAmount = ethers.utils.parseUnits(amount, decimals);

            transactionStatus.textContent = "Sending transaction...";
            const tx = await usdtContract.transfer(recipient, parsedAmount);
            await tx.wait();

            transactionStatus.textContent = "Transaction successful!";
            updateBalance(await signer.getAddress());
        } catch (error) {
            console.error("Transaction failed:", error);
            transactionStatus.textContent = "Transaction failed.";
        }
    });

    async function updateBalance(userAddress) {
        try {
            const balance = await usdtContract.balanceOf(userAddress);
            const decimals = await usdtContract.decimals();
            usdtBalanceSpan.textContent = ethers.utils.formatUnits(balance, decimals);
        } catch (error) {
            console.error("Failed to update balance:", error);
        }
    }

    // --- Initial Load ---
    checkAccess();
});