/*
  Unit tests for the wallet-usdc-balance command.
*/

// eslint-disable-next-line
/// <reference types="mocha" />

// Global npm libraries
import { assert } from 'chai'
import sinon from 'sinon'
import Web3 from 'web3'

// Local libraries
import WalletUsdcBalance from '../../../src/commands/wallet-usdc-balance'
import configSettings from '../../../src/config'

describe('#wallet-usdc-balance', () => {
  let uut: any
  let sandbox: any

  beforeEach(() => {
    uut = new WalletUsdcBalance(undefined, undefined)

    sandbox = sinon.createSandbox()
  })

  afterEach(() => sandbox.restore())

  describe('#generateContractInterface', () => {
    it('should generate Contract instance.', async () => {
      const web3 = new Web3(configSettings.provider)

      const result = await uut.generateContractInterface(web3)
      // console.log('result: ', result)

      assert.property(result.methods, 'balanceOf')
    })
  })

  describe('#getBalance()', () => {
    it('should get ERC20 balance', async () => {
      const flags = {
        name: 'testwallet'
      }

      const result = await uut.getBalance(flags)

      assert.property(result, 'balance')
    })
  })

  describe('#run()', () => {
    it('should get ETH balance for wallet', async () => {
      // Mock dependencies and force desired code path.
      sandbox.stub(uut, 'parse').resolves({ flags: { name: 'testwallet' } })
      sandbox.stub(uut, 'getBalance').resolves(1000000000)

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
