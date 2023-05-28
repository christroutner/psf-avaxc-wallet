/*
  Create a new keypair that can be imported into metamask.
*/

// Global npm libraries
import { Args, Command, Flags } from '@oclif/core'
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
    `$ oex hello friend --from oclif
hello friend from oclif! (./src/commands/hello/index.ts)
`
  ]

  static flags = {
    name: Flags.string({ char: 'n', description: 'Filename for wallet file', required: true })
  }

  // static args = {
  //   person: Args.string({ description: 'Person to say hello to', required: true })
  // }

  async run (): Promise<void> {
    try {
      const { args, flags } = await this.parse(WalletCreate)

      // Instantiate web3 with a provider.
      // const web3Provider = new Web3.providers.HttpProvider(provider);
      // const web3 = new Web3(web3Provider);
      const web3 = new Web3(provider)

      // Create a new account.
      const account = web3.eth.accounts.create()
      console.log('account: ', account)

      // Save the wallet data into a .json text file.
      const walletObj = {
        address: account.address,
        privateKey: account.privateKey
      }

      // Write the object to a file
      await this.walletUtil.saveWallet(flags.name, walletObj)
    } catch (err) {
      console.error(err)
    }
  }
}

export default WalletCreate
