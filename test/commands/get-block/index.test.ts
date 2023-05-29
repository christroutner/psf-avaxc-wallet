/*
  Unit tests for the get-block command.
*/

// eslint-disable-next-line
/// <reference types="mocha" />

// Global npm libraries
import { assert } from 'chai'
import sinon from 'sinon'

// Local libraries
import GetBlock from '../../../src/commands/get-block'

describe('#get-block', () => {
  let uut: any
  let sandbox: any

  beforeEach(() => {
    uut = new GetBlock(undefined, undefined)

    sandbox = sinon.createSandbox()
  })

  afterEach(() => sandbox.restore())

  describe('#getBlock', () => {
    it('should get block', async () => {
      // Mock dependencies and force desired code path.
      sandbox.stub(uut.web3.eth, 'getBlock').resolves({ hash: 'test' })

      const flags = {
        height: 1
      }

      const result = await uut.getBlock(flags)

      assert.property(result, 'hash')
    })
  })

  describe('#run()', () => {
    it('should get ETH balance for wallet', async () => {
      // Mock dependencies and force desired code path.
      sandbox.stub(uut, 'parse').resolves({ flags: { height: 1 } })
      sandbox.stub(uut, 'getBlock').resolves({ hash: 'test' })

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
