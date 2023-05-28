/*
  Create a new keypair that can be imported into metamask.
*/

// Global npm libraries
import { Command, Flags } from '@oclif/core'
import Web3 from 'web3'

// Local libraries
import WalletUtil from '../../lib/wallet-util'

const provider = 'https://rpc.ankr.com/eth/4d57e604f2505f964c927dcdd7a94b51fd5496cbd778029c9b5400531bedb3dc'

interface WalletCreate {
  walletUtil: WalletUtil
}

class WalletCreate extends Command {
  constructor (argv: any, config: any) {
    super(argv, config)

    // Encapsulate dependencies
    this.walletUtil = new WalletUtil()
  }

  static description = 'Create a new wallet.'

  static examples = [
    `$ psf-avaxc-wallet create-wallet -n mywallet

`
  ]

  static flags = {
    name: Flags.string({ char: 'n', description: 'Filename for wallet file', required: true })
  }

  async run (): Promise<void> {
    try {
      const { flags } = await this.parse(WalletCreate)

      await this.createWallet(flags)
    } catch (err) {
      console.error(err)
    }
  }

  // Generate a new key pair, save it to a file, and return an object containing
  // the address and private key.
  async createWallet (flags: any): Promise<object> {
    // Instantiate web3 with a provider.
    const web3 = new Web3(provider)

    // Create a new account.
    const account = web3.eth.accounts.create()
    // console.log('account: ', account)

    // Save the wallet data into a .json text file.
    const walletObj = {
      address: account.address,
      privateKey: account.privateKey
    }

    // Write the object to a file
    await this.walletUtil.saveWallet(flags.name, walletObj)

    return walletObj
  }
}

export default WalletCreate
