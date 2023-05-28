/*
  Check the balance for a wallet
*/

// Global npm libraries
import { Command, Flags } from '@oclif/core'
import Web3 from 'web3'

// Local libraries
import WalletUtil from '../../lib/wallet-util'
import configSettings from '../../config'

interface WalletBalance {
  walletUtil: WalletUtil
  configSettings: any
}

class WalletBalance extends Command {
  constructor (argv: any, config: any) {
    super(argv, config)

    // Encapsulate dependencies
    this.walletUtil = new WalletUtil()
    this.configSettings = configSettings

    // Bind functions that need access to 'this'
    this.getBalance = this.getBalance.bind(this)
  }

  static description = 'Check the balance of a wallet'

  static examples = [
    `$ psf-avaxc-wallet wallet-balance -n mywallet

`
  ]

  static flags = {
    name: Flags.string({ char: 'n', description: 'Filename for wallet file', required: true })
  }

  async run (): Promise<boolean> {
    try {
      const { flags } = await this.parse(WalletBalance)

      const balanceObj: any = await this.getBalance(flags)

      console.log('balance: ', balanceObj)

      return true
    } catch (err) {
      console.error(err)

      return false
    }
  }

  // Generate a new key pair, save it to a file, and return an object containing
  // the address and private key.
  async getBalance (flags: any): Promise<object> {
    // Instantiate web3 with a provider.
    const web3 = new Web3(this.configSettings.provider)

    const walletData: any = await this.walletUtil.openWallet(flags.name)
    // console.log('walletData: ', walletData)

    const balance = await web3.eth.getBalance(walletData.address)
    // console.log('balance: ', balance)

    return {
      balance
    }
  }
}

export default WalletBalance
