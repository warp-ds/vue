# Contributing to @warp-ds/vue

Welcome to the [@warp-ds/vue](https://github.com/warp-ds/vue) repository!
We're glad you're interested in contributing.

This repository is maintained by the [Warp Core Team](https://github.com/orgs/warp-ds/teams/warp-core-team)
and is home to the [@warp-ds/vue](https://www.npmjs.com/package/@warp-ds/vue) library,
a collection of Vue3 components for building user interfaces based on the
[Warp Design System](https://github.com/warp-ds/).

To get an overview of the project, read the [README](README.md).


## Development Setup

To get started with developing [@warp-ds/vue](https://github.com/warp-ds/vue), follow the instructions below.
This will walk you through setting up your development environment and running the tests.


### Cloning the repository

Start by cloning the repository to your dev environment by running:

```sh
git clone https://github.com/warp-ds/vue
```


### pnpm

We use [pnpm](https://pnpm.io/) as package manager for Node.js.
Install it by running:

```sh
npm install -g pnpm
```


### Dependencies

Install dependencies by running:

```sh
pnpm i
```


### Start dev server

Start a Vite server (from the `dev` folder) on port 3003:
```sh
pnpm dev
```


### Production build

Running `pnpm build` will produce both a build to be published to NPM and a build for Eik - both will be placed in the `dist` folder.

```sh
pnpm build
```


## Contributing

### Branching

There are two branches to keep in mind:
- `alpha` : used for pre-releases.
- `main` : the main branch, used for stable releases.

When adding a new feature, fixing a bug, or adding to the repository in any other way,
you should always do this in a feature branch that is branched off the `alpha` branch.

### Committing

It is important to follow [Conventional Commits](https://www.conventionalcommits.org/) when making changes ([Commitizen](#commitizen) to the rescue),
as this is used in the [automated release process](#releases).

### Pull Request

When your changes are ready for pull request, this should be opened against the `alpha` branch.
Add the [Warp Core Team](https://github.com/orgs/warp-ds/teams/warp-core-team) as reviewer.

Pull request to the `alpha` branch should always be set to *squash*.
Make sure that the squash commit message follows the instructions in the [Committing](#committing) section before squash merging the pull request.

### Commitizen

We use [commitizen](https://github.com/commitizen/cz-cli) to ensure coherent commit message structure.
This is used to automatically generate change logs and handle versioning when [releasing](#releases).

```sh
npm install -g commitizen
```

When installed, you should be able to type `cz` or `git cz` in your terminal to commit your changes (replacing
`git commit`).

[![Add and commit with Commitizen](https://github.com/commitizen/cz-cli/raw/master/meta/screenshots/add-commit.png)](https://github.com/commitizen/cz-cli/raw/master/meta/screenshots/add-commit.png)


## Releases

This project uses [Semantic Release](https://github.com/semantic-release/semantic-release) to automate package
publishing when making changes to the `main` or `alpha` branch.

Please note that the version published will depend on your commit message structure.
Make sure to review and follow the instructions in the [Committing](#committing) section before committing.

Before the first major release we develop against an `alpha` branch which is constantly published to [NPM](https://www.npmjs.com/package/@warp-ds/vue) and [Eik]( ) using an `alpha` tag (e.g. `1.0.0-alpha.1`).
Anyone needing to start using the package before the first major release can install the `alpha` version while waiting for the first stable version.

TODO: When the first stable release is done, the `alpha` branch should possibly be renamed `next` to implement releasing a `next` tag from that branch instead of `alpha`.

A stable release from the `main` branch is basically done by just opening a pull request from `alpha` to `main` and then make sure to *merge* commit the pull request.
Never squash to `main` to prevent losing history and commit messages from all commits to `alpha`.

To avoid git history divergence between `alpha` and `main`,
when a stable release from `main` results in a semantic-release-bot commit being pushed to `main`,
a GitHub action automatically rebase `alpha` to `origin/main` after every release from `main`.

( For reference, see this rfc in Fabric-ds: [RFC: Fabric Releases and Release Schedule](https://github.com/fabric-ds/issues/blob/779d59723993c13d62374516259602d967da56ca/rfcs/0004-releases.md) )

## License

@warp-ds/vue is [Apache-2.0 licensed](https://github.com/warp-ds/vue/blob/main/LICENSE).
By contributing to @warp-ds/vue, you agree that your contributions will be licensed under its Apache-2.0 license.