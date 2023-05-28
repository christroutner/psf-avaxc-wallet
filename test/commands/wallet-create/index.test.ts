/*
  Unit tests for the wallet-create command.
*/

/// <reference types="mocha" />

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

      assert.property(result, 'address')
      assert.property(result, 'privateKey')
    })
  })
})
