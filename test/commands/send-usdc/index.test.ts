/*
  Unit tests for the send-eth command.
*/

// eslint-disable-next-line
/// <reference types="mocha" />

// Global npm libraries
import { assert } from 'chai'
import sinon from 'sinon'

// Local libraries
import SendUsdc from '../../../src/commands/send-usdc'

describe('#send-eth', () => {
  let uut: any
  let sandbox: any

  beforeEach(() => {
    uut = new SendUsdc(undefined, undefined)

    sandbox = sinon.createSandbox()
  })

  afterEach(() => sandbox.restore())

  describe('#generateContractInterface', () => {
    it('should generate Contract instance.', async () => {
      const result = await uut.generateContractInterface()
      // console.log('result: ', result)

      assert.property(result.methods, 'transfer')
    })
  })

  describe('#broadcast()', () => {
    it('should broadcast a signed TX', async () => {
      // Mock dependencies and force desired code path
      sandbox.stub(uut.web3.eth, 'sendSignedTransaction').resolves('test')

      const result = await uut.broadcast('test')

      assert.equal(result, 'test')
    })
  })

  describe('#sendUsdc', () => {
    it('should send USDC', async () => {
      // Mock dependencies and force desired code path.
      sandbox.stub(uut, 'generateContractInterface').returns({
        methods: {
          transfer: () => {
            return {
              estimateGas: () => 1,
              encodeABI: () => {}
            }
          }
        },
        options: {
          address: 'test'
        }
      })
      sandbox.stub(uut.web3.eth, 'getTransactionCount').resolves(1)
      sandbox.stub(uut.web3.eth, 'getGasPrice').resolves(1)
      sandbox.stub(uut.web3.eth.accounts, 'signTransaction').resolves('test')
      sandbox.stub(uut, 'broadcast').resolves({})

      const flags = {
        name: 'testwallet',
        to: 'test',
        amount: 1
      }

      const result = await uut.sendUsdc(flags)

      assert.isObject(result)
    })

    it('should catch, report, and throw errors', async () => {
      try {
        // Force an error
        sandbox.stub(uut, 'generateContractInterface').throws(new Error('test error'))

        await uut.sendUsdc({})

        assert.fail('Unexpected code path')
      } catch (err: any) {
        assert.include(err.message, 'test error')
      }
    })
  })

  describe('#run()', () => {
    it('should send USDC', async () => {
      // Mock dependencies and force desired code path.
      sandbox.stub(uut, 'parse').resolves({ flags: { name: 'testwallet' } })
      sandbox.stub(uut, 'sendUsdc').resolves({ transactionHas: '0x1234' })

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
