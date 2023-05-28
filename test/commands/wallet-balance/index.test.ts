/*
  Unit tests for the wallet-balance command.
*/

// eslint-disable-next-line
/// <reference types="mocha" />

// Global npm libraries
import { assert } from 'chai'
import sinon from 'sinon'

// Local libraries
import WalletBalance from '../../../src/commands/wallet-balance'

describe('#wallet-create', () => {
  let uut: any
  let sandbox: any

  beforeEach(() => {
    uut = new WalletBalance(undefined, undefined)

    sandbox = sinon.createSandbox()
  })

  afterEach(() => sandbox.restore())

  describe('#getBalance()', () => {
    it('should create a new wallet', async () => {
      const flags = {
        name: 'testwallet'
      }

      const result = await uut.getBalance(flags)

      assert.property(result, 'balance')
    })
  })

  describe('#run()', () => {
    it('should create a new wallet', async () => {
      // Mock dependencies and force desired code path.
      sandbox.stub(uut, 'parse').resolves({ flags: { name: 'testwallet' } })
      sandbox.stub(uut, 'getBalance').resolves()

      const result = await uut.run()

      assert.equal(result, true)
    })

    it('should report errors and return false', async () => {
      // Force an error
      sandbox.stub(uut, 'parse').rejects(new Error('test error'))

      const result = await uut.run()

      assert.equal(result, false)
    })
  })
})
