/*
  Create a new wallet.
*/

import { Args, Command, Flags } from '@oclif/core'

// @ts-ignore
import * as Conf from 'conf'

interface WalletCreate {
  conf: any
}

class WalletCreate extends Command {
  constructor (argv: any, config: any) {
    super(argv, config)

    this.conf = new Conf()
  }

  static description = 'Create a new wallet.'

  static examples = [
    `$ oex hello friend --from oclif
hello friend from oclif! (./src/commands/hello/index.ts)
`
  ]

  static flags = {
    from: Flags.string({ char: 'f', description: 'Who is saying hello', required: true })
  }

  static args = {
    person: Args.string({ description: 'Person to say hello to', required: true })
  }

  async run (): Promise<void> {
    const { args, flags } = await this.parse(WalletCreate)

    this.log(`hello ${args.person} from ${flags.from}! (./src/commands/hello/index.ts)`)
  }
}

export default WalletCreate
