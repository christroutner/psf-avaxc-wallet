/*
  Unit tests for the wallet-create command.
*/

// Global npm libraries
import { assert } from 'chai'

// Local libraries
import WalletCreate from '../../../src/commands/wallet-create'

describe('#wallet-create', () => {
  let uut: any

  beforeEach(() => {
    uut = new WalletCreate(undefined, undefined)
  })

  describe('#createWallet()', () => {
    it('should create a new wallet', async () => {
      const flags = {
        name: 'testwallet'
      }

      const result = await uut.createWallet(flags)

      assert.equal(result, true)
    })
  })
})
