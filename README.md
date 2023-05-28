oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![GitHub license](https://img.shields.io/github/license/oclif/hello-world)](https://github.com/oclif/hello-world/blob/main/LICENSE)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g psf-avaxc-wallet
$ psf-avaxc-wallet COMMAND
running command...
$ psf-avaxc-wallet (--version)
psf-avaxc-wallet/0.0.0 linux-x64 node-v16.19.0
$ psf-avaxc-wallet --help [COMMAND]
USAGE
  $ psf-avaxc-wallet COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`psf-avaxc-wallet hello PERSON`](#psf-avaxc-wallet-hello-person)
* [`psf-avaxc-wallet hello world`](#psf-avaxc-wallet-hello-world)
* [`psf-avaxc-wallet help [COMMANDS]`](#psf-avaxc-wallet-help-commands)
* [`psf-avaxc-wallet plugins`](#psf-avaxc-wallet-plugins)
* [`psf-avaxc-wallet plugins:install PLUGIN...`](#psf-avaxc-wallet-pluginsinstall-plugin)
* [`psf-avaxc-wallet plugins:inspect PLUGIN...`](#psf-avaxc-wallet-pluginsinspect-plugin)
* [`psf-avaxc-wallet plugins:install PLUGIN...`](#psf-avaxc-wallet-pluginsinstall-plugin-1)
* [`psf-avaxc-wallet plugins:link PLUGIN`](#psf-avaxc-wallet-pluginslink-plugin)
* [`psf-avaxc-wallet plugins:uninstall PLUGIN...`](#psf-avaxc-wallet-pluginsuninstall-plugin)
* [`psf-avaxc-wallet plugins:uninstall PLUGIN...`](#psf-avaxc-wallet-pluginsuninstall-plugin-1)
* [`psf-avaxc-wallet plugins:uninstall PLUGIN...`](#psf-avaxc-wallet-pluginsuninstall-plugin-2)
* [`psf-avaxc-wallet plugins update`](#psf-avaxc-wallet-plugins-update)

## `psf-avaxc-wallet hello PERSON`

Say hello

```
USAGE
  $ psf-avaxc-wallet hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/christroutner/psf-avaxc-wallet/blob/v0.0.0/dist/commands/hello/index.ts)_

## `psf-avaxc-wallet hello world`

Say hello world

```
USAGE
  $ psf-avaxc-wallet hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ psf-avaxc-wallet hello world
  hello world! (./src/commands/hello/world.ts)
```

## `psf-avaxc-wallet help [COMMANDS]`

Display help for psf-avaxc-wallet.

```
USAGE
  $ psf-avaxc-wallet help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for psf-avaxc-wallet.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.9/src/commands/help.ts)_

## `psf-avaxc-wallet plugins`

List installed plugins.

```
USAGE
  $ psf-avaxc-wallet plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ psf-avaxc-wallet plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.7/src/commands/plugins/index.ts)_

## `psf-avaxc-wallet plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ psf-avaxc-wallet plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ psf-avaxc-wallet plugins add

EXAMPLES
  $ psf-avaxc-wallet plugins:install myplugin 

  $ psf-avaxc-wallet plugins:install https://github.com/someuser/someplugin

  $ psf-avaxc-wallet plugins:install someuser/someplugin
```

## `psf-avaxc-wallet plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ psf-avaxc-wallet plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ psf-avaxc-wallet plugins:inspect myplugin
```

## `psf-avaxc-wallet plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ psf-avaxc-wallet plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ psf-avaxc-wallet plugins add

EXAMPLES
  $ psf-avaxc-wallet plugins:install myplugin 

  $ psf-avaxc-wallet plugins:install https://github.com/someuser/someplugin

  $ psf-avaxc-wallet plugins:install someuser/someplugin
```

## `psf-avaxc-wallet plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ psf-avaxc-wallet plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ psf-avaxc-wallet plugins:link myplugin
```

## `psf-avaxc-wallet plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ psf-avaxc-wallet plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ psf-avaxc-wallet plugins unlink
  $ psf-avaxc-wallet plugins remove
```

## `psf-avaxc-wallet plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ psf-avaxc-wallet plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ psf-avaxc-wallet plugins unlink
  $ psf-avaxc-wallet plugins remove
```

## `psf-avaxc-wallet plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ psf-avaxc-wallet plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ psf-avaxc-wallet plugins unlink
  $ psf-avaxc-wallet plugins remove
```

## `psf-avaxc-wallet plugins update`

Update installed plugins.

```
USAGE
  $ psf-avaxc-wallet plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
