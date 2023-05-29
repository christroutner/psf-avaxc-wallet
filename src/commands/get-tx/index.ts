/*
  Get information about a TX, given its TXID.
*/

// Global npm libraries
import { Command, Flags } from '@oclif/core'
import Web3 from 'web3'

// Local libraries
import WalletUtil from '../../lib/wallet-util'
import configSettings from '../../config'

interface GetTx {
  walletUtil: WalletUtil
  configSettings: any
  web3: Web3
}

class GetTx extends Command {
  constructor (argv: any, config: any) {
    super(argv, config)

    // Encapsulate dependencies
    this.walletUtil = new WalletUtil()
    this.configSettings = configSettings
    this.web3 = new Web3(this.configSettings.provider)

    // Bind functions that need access to 'this'
    this.getTx = this.getTx.bind(this)
  }

  static description = 'Get information on a transaction'

  static examples = [
    `$ psf-avaxc-wallet get-tx -t 0x1a5d6633e3db51808cce004c475db2f33906b3c66323dcd7740d5f1c72047092

`
  ]

  static flags = {
    txid: Flags.string({ char: 't', description: 'Transaction ID', required: true })
  }

  async run (): Promise<boolean> {
    try {
      const { flags } = await this.parse(GetTx)

      const txData: any = await this.getTx(flags)

      console.log('txData: ', txData)

      return true
    } catch (err) {
      console.error(err)

      return false
    }
  }

  async getTx (flags: any): Promise<object> {
    const txData = await this.web3.eth.getTransaction(flags.txid)

    return txData
  }
}

export default GetTx
