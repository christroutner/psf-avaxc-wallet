/*
  Utility library of commonly-used wallet functions.
*/

// Global npm libraries.
import { promises as fs } from 'fs'

interface WalletUtil {
  fs: typeof fs
}

class WalletUtil {
  constructor (localConfig = {}) {
    // Encapsulate dependencies
    this.fs = fs

    // Bind all subfunctions to the 'this' object
    this.saveWallet = this.saveWallet.bind(this)
  }

  // Save the wallet data into a .json text file.
  async saveWallet (filename: string, walletData: object): Promise<boolean> {
    // Generate a filepath for the new file, in the .wallets directory.
    const filepath = `${__dirname.toString()}/../../.wallets/${filename}`

    await this.fs.writeFile(filepath, JSON.stringify(walletData, null, 2))

    return true
  }

  async openWallet (filename: string): Promise<object> {
    // Generate a filepath for the new file, in the .wallets directory.
    const filepath = `${__dirname.toString()}/../../.wallets/${filename}`

    const walletData = await this.fs.readFile(filepath, 'utf8')

    return JSON.parse(walletData)
  }
}

export default WalletUtil
