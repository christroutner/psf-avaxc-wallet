/*
  Get information about a block, given the block height.
*/

// Global npm libraries
import { Command, Flags } from '@oclif/core'
import Web3 from 'web3'

// Local libraries
import WalletUtil from '../../lib/wallet-util'
import configSettings from '../../config'

interface GetBlock {
  walletUtil: WalletUtil
  configSettings: any
  web3: Web3
}

class GetBlock extends Command {
  constructor (argv: any, config: any) {
    super(argv, config)

    // Encapsulate dependencies
    this.walletUtil = new WalletUtil()
    this.configSettings = configSettings
    this.web3 = new Web3(this.configSettings.provider)

    // Bind functions that need access to 'this'
    this.getBlock = this.getBlock.bind(this)
  }

  static description = 'Get information on a block'

  static examples = [
    `$ psf-avaxc-wallet get-block -h 3571371

`
  ]

  static flags = {
    height: Flags.string({ char: 'h', description: 'Block height', required: true })
  }

  async run (): Promise<boolean> {
    try {
      const { flags } = await this.parse(GetBlock)

      const blockData: any = await this.getBlock(flags)

      console.log('blockData: ', blockData)

      return true
    } catch (err) {
      console.error(err)

      return false
    }
  }

  async getBlock (flags: any): Promise<object> {
    const blockData = await this.web3.eth.getBlock(flags.height)
    // console.log('blockData: ', blockData)

    return blockData
  }
}

export default GetBlock
