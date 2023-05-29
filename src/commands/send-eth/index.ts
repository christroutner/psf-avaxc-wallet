/*
  Send a quantity of ETH to an address
*/

// Global npm libraries
import { Command, Flags } from '@oclif/core'
import Web3 from 'web3'

// Local libraries
import WalletUtil from '../../lib/wallet-util'
import configSettings from '../../config'

interface SendEth {
  walletUtil: WalletUtil
  configSettings: any
  web3: Web3
}

interface Receipt {
  transactionHash: string
}

class SendEth extends Command {
  constructor (argv: any, config: any) {
    super(argv, config)

    // Encapsulate dependencies
    this.walletUtil = new WalletUtil()
    this.configSettings = configSettings
    this.web3 = new Web3(this.configSettings.provider)

    // Bind functions that need access to 'this'
    this.sendEth = this.sendEth.bind(this)
  }

  static description = 'Check the balance of a wallet'

  static examples = [
    `$ psf-avaxc-wallet send-eth -n mywallet -q 0.001 -a 0x1234

`
  ]

  static flags = {
    qty: Flags.string({ char: 'q', description: 'Quantity of ETH to send', required: true }),
    addr: Flags.string({ char: 'a', description: 'Address to send ETH to', required: true }),
    name: Flags.string({ char: 'n', description: 'Filename for wallet file', required: true })
  }

  async run (): Promise<boolean> {
    try {
      const { flags } = await this.parse(SendEth)

      const receipt: Receipt = await this.sendEth(flags)
      console.log('receipt: ', receipt)

      console.log(`TXID: ${receipt.transactionHash}`)
      console.log(`https://sepolia.etherscan.io/tx/${receipt.transactionHash}`)

      return true
    } catch (err) {
      console.error(err)

      return false
    }
  }

  async sendEth (flags: any): Promise<Receipt> {
    const walletData: any = await this.walletUtil.openWallet(flags.name)
    // console.log('walletData: ', walletData)

    const account = this.web3.eth.accounts.privateKeyToAccount(walletData.privateKey)

    // Convert from ETH to wei
    const value = flags.qty * 10 ** 18

    const txParams = {
      // nonce: web3.utils.toHex(await web3.eth.getTransactionCount(account.address)),
      from: account.address,
      to: flags.addr,
      value,
      gas: '21000'
      // gasPrice: web3.utils.toHex(gasPrice),
      // gasLimit: web3.utils.toHex(1000),
    }

    const signedTx: any = await account.signTransaction(txParams)

    // const receipt = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction)
    const receipt = await this.broadcast(signedTx.rawTransaction)
    // console.log('receipt: ', receipt)

    return receipt
  }

  async broadcast (rawTx: any): Promise<Receipt> {
    const receipt = await this.web3.eth.sendSignedTransaction(rawTx)
    // console.log('receipt: ', receipt)

    return receipt
  }
}

export default SendEth
