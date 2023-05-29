/*
  Unit tests for the send-eth command.
*/

// eslint-disable-next-line
/// <reference types="mocha" />

// Global npm libraries
import { assert } from 'chai'
import sinon from 'sinon'

// Local libraries
import SendEth from '../../../src/commands/send-eth'

describe('#send-eth', () => {
  let uut: any
  let sandbox: any

  beforeEach(() => {
    uut = new SendEth(undefined, undefined)

    sandbox = sinon.createSandbox()
  })

  afterEach(() => sandbox.restore())

  describe('#broadcast()', () => {
    it('should broadcast a signed TX', async () => {
      // Mock dependencies and force desired code path
      sandbox.stub(uut.web3.eth, 'sendSignedTransaction').resolves('test')

      const result = await uut.broadcast('test')

      assert.equal(result, 'test')
    })
  })

  describe('#sendEth', () => {
    it('should send ETH', async () => {
      // Mock dependencies and force desired code path.
      sandbox.stub(uut.web3.eth.accounts, 'signTransaction').resolves('test')
      sandbox.stub(uut, 'broadcast').resolves({})

      const flags = {
        name: 'testwallet',
        to: 'test',
        amount: 1
      }

      const result = await uut.sendEth(flags)

      assert.isObject(result)
    })
  })

  describe('#run()', () => {
    it('should send eth', async () => {
      // Mock dependencies and force desired code path.
      sandbox.stub(uut, 'parse').resolves({ flags: { name: 'testwallet' } })
      sandbox.stub(uut, 'sendEth').resolves({ transactionHas: '0x1234' })

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
