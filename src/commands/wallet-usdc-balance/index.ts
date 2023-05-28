/*
  Check the balance of USDC tokens for a wallet
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

interface WalletUsdcBalance {
  walletUtil: WalletUtil
  configSettings: any
}

class WalletUsdcBalance extends Command {
  constructor (argv: any, config: any) {
    super(argv, config)

    // Encapsulate dependencies
    this.walletUtil = new WalletUtil()
    this.configSettings = configSettings

    // Bind functions that need access to 'this'
    this.getBalance = this.getBalance.bind(this)
    this.generateContractInterface = this.generateContractInterface.bind(this)
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
      const { flags } = await this.parse(WalletUsdcBalance)

      const balanceObj: any = await this.getBalance(flags)

      const normalBalance = balanceObj.balance / 10 ** 18

      console.log('USDC balance: ', normalBalance)

      return true
    } catch (err) {
      console.error(err)

      return false
    }
  }

  generateContractInterface (web3: Web3): Contract {
    // Define the ERC20 contract ABI.
    const erc20Abi: AbiItem[] = [
      {
        constant: true,
        inputs: [{ name: '_owner', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: 'balance', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      }
    ]

    // Instantiate the ERC20 contract instance.
    const erc20Contract = new web3.eth.Contract(erc20Abi, usdcContractAddr)

    return erc20Contract
  }

  // Get the balance of USDC ERC20 tokens for the wallet.
  async getBalance (flags: any): Promise<object> {
    // Instantiate web3 with a provider.
    const web3 = new Web3(this.configSettings.provider)

    // Create an object that is an interface to the USDC contract.
    const erc20Contract = this.generateContractInterface(web3)

    const walletData: any = await this.walletUtil.openWallet(flags.name)
    // console.log('walletData: ', walletData)

    // Get the balance of an address.
    const balance = await erc20Contract.methods.balanceOf(walletData.address).call()

    return {
      balance
    }
  }
}

export default WalletUsdcBalance
