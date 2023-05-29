/*
  Send a quantity of USDC to an address
*/

// Global npm libraries
import { Command, Flags } from '@oclif/core'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import { Contract } from 'web3-eth-contract'

// Local libraries
import WalletUtil from '../../lib/wallet-util'
import configSettings from '../../config'

const usdcContractAddr = '0x6f14C02Fc1F78322cFd7d707aB90f18baD3B54f5'

interface SendUsdc {
  walletUtil: WalletUtil
  configSettings: any
  web3: Web3
}

interface Receipt {
  transactionHash: string
}

class SendUsdc extends Command {
  constructor (argv: any, config: any) {
    super(argv, config)

    // Encapsulate dependencies
    this.walletUtil = new WalletUtil()
    this.configSettings = configSettings
    this.web3 = new Web3(this.configSettings.provider)

    // Bind functions that need access to 'this'
    this.sendUsdc = this.sendUsdc.bind(this)
    this.generateContractInterface = this.generateContractInterface.bind(this)
  }

  static description = 'Send a quantity of USDC to an address'

  static examples = [
    `$ psf-avaxc-wallet send-usdc -n mywallet -q 1 -a 0x1234

`
  ]

  static flags = {
    name: Flags.string({ char: 'n', description: 'Filename for wallet file', required: true }),
    qty: Flags.string({ char: 'q', description: 'Quantity of ETH to send', required: true }),
    addr: Flags.string({ char: 'a', description: 'Address to send ETH to', required: true })
  }

  async run (): Promise<boolean> {
    try {
      const { flags } = await this.parse(SendUsdc)

      const tx: Receipt = await this.sendUsdc(flags)
      console.log('tx: ', tx)

      console.log(`TXID: ${tx.transactionHash}`)
      console.log(`https://sepolia.etherscan.io/tx/${tx.transactionHash}`)

      return true
    } catch (err) {
      console.error(err)

      return false
    }
  }

  generateContractInterface (): Contract {
    // Define the ERC20 contract ABI.
    const erc20Abi: AbiItem[] = [
      {
        constant: false,
        inputs: [
          { name: '_to', type: 'address' },
          { name: '_value', type: 'uint256' }
        ],
        name: 'transfer',
        outputs: [{ name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      }
    ]

    // Instantiate the ERC20 contract instance.
    const erc20Contract = new this.web3.eth.Contract(erc20Abi, usdcContractAddr)

    return erc20Contract
  }

  // Get the balance of USDC ERC20 tokens for the wallet.
  async sendUsdc (flags: any): Promise<Receipt> {
    try {
      // Create an object that is an interface to the USDC contract.
      const erc20Contract = this.generateContractInterface()

      // Open the wallet data file.
      const walletData: any = await this.walletUtil.openWallet(flags.name)
      // console.log('walletData: ', walletData)

      // Generate an account object from the private key.
      const account = this.web3.eth.accounts.privateKeyToAccount(walletData.privateKey)
      const fromAddress = walletData.address

      // Convert USDC amount to wei.
      const amount = (flags.qty * 10 ** 18).toString()
      console.log('amount: ', amount)

      // Get the nonce for the sender address.
      const nonce = await this.web3.eth.getTransactionCount(fromAddress)
      console.log('nonce: ', nonce)

      // Generate the transaction object.
      const txObj = erc20Contract.methods.transfer(flags.addr, amount)
      console.log('txObj: ', txObj)

      // Estimate the gas required for the transaction.
      const gas = await txObj.estimateGas({ from: fromAddress })

      // Get the gas price from the network.
      const gasPrice = await this.web3.eth.getGasPrice()

      // Create the raw transaction object.
      const rawTx = {
        nonce,
        gasPrice,
        gasLimit: gas,
        to: erc20Contract.options.address,
        value: 0,
        data: txObj.encodeABI()
      }

      const signedTx: any = await account.signTransaction(rawTx)

      const receipt = await this.broadcast(signedTx.rawTransaction)

      return receipt
    } catch (err) {
      console.error('Error in sendUsdc(): ', err)
      throw err
    }
  }

  async broadcast (rawTx: any): Promise<Receipt> {
    const receipt = await this.web3.eth.sendSignedTransaction(rawTx)
    // console.log('receipt: ', receipt)

    return receipt
  }
}

export default SendUsdc
