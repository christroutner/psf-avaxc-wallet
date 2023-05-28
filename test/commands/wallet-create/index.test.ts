/*
  Unit tests for the wallet-create command.
*/

// eslint-disable-next-line
/// <reference types="mocha" />

// Global npm libraries
import { assert } from 'chai'
import sinon from 'sinon'

// Local libraries
import WalletCreate from '../../../src/commands/wallet-create'

describe('#wallet-create', () => {
  let uut: any
  let sandbox: any

  beforeEach(() => {
    uut = new WalletCreate(undefined, undefined)

    sandbox = sinon.createSandbox()
  })

  afterEach(() => sandbox.restore())

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

  describe('#run()', () => {
    it('should create a new wallet', async () => {
      // Mock dependencies and force desired code path.
      sandbox.stub(uut, 'parse').resolves({ flags: { name: 'testwallet' } })
      sandbox.stub(uut, 'createWallet').resolves()

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
