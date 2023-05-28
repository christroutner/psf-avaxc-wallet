/*
  Utility library for wallet functions.
*/

// Global npm libraries.
import fs from 'fs'

interface WalletUtil {
  fs: any
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
    await this.fs.writeFile(filename, JSON.stringify(walletData, null, 2))

    return true
  }
}

export default WalletUtil
