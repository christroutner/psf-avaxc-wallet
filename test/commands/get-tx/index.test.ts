/*
  Unit tests for the get-tx command.
*/

// eslint-disable-next-line
/// <reference types="mocha" />

// Global npm libraries
import { assert } from 'chai'
import sinon from 'sinon'

// Local libraries
import GetTx from '../../../src/commands/get-tx'

describe('#get-tx', () => {
  let uut: any
  let sandbox: any

  beforeEach(() => {
    uut = new GetTx(undefined, undefined)

    sandbox = sinon.createSandbox()
  })

  afterEach(() => sandbox.restore())

  describe('#GetTx', () => {
    it('should get tx details', async () => {
      // Mock dependencies and force desired code path.
      sandbox.stub(uut.web3.eth, 'getTransaction').resolves({ hash: 'test' })

      const flags = {
        height: 1
      }

      const result = await uut.getTx(flags)

      assert.property(result, 'hash')
    })
  })

  describe('#run()', () => {
    it('should get tx data and return true', async () => {
      // Mock dependencies and force desired code path.
      sandbox.stub(uut, 'parse').resolves({ flags: { height: 1 } })
      sandbox.stub(uut, 'getTx').resolves({ hash: 'test' })

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
