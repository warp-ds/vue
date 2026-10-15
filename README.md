# Warp-ds Vue

This repository is no longer actively maintained. New users should instead use [@warp-ds/elements](https://github.com/warp-ds/elements) web components in Vue.

## How to use

### Installation

Install by using npm/pnpm or by adding a script link:

#### Install using npm
```sh
npm install @warp-ds/vue
```

#### Install using pnpm
```sh
pnpm add @warp-ds/vue
```

#### Using a direct link to Eik
```html
<script src="https://assets.finn.no/pkg/@warp-ds/vue/v1"></script>
```

### Documentation

For information on the components available in the package and how to use them,
see the [Warp Design System documentation](https://warp-ds.github.io/tech-docs/).

### Storybook

Storybook can be started by running `pnpm storybook`. 

## Releases

This project is continuously published to [NPM](https://www.npmjs.com/package/@warp-ds/vue) and [Eik](https://assets.finn.no/pkg/@warp-ds/vue) using a `next` tag (e.g. `1.1.0-next.1`).
Anyone needing to use the latest changes of this package can point to the `next` version while waiting for the stable release.

## Changelog

Detailed changes for each release can be found in the [CHANGELOG](CHANGELOG.md) file.

## NOTE:
Currently Crowdin has a bug that makes the synchronize-with-crowdin build step fail in the next-branch. Crowdin does some extra pre-processing of uploaded files, and their processor breaks with obsolete strings syntax in the .po-files. 

A temporary fix to this is to run 
```sh
pnpm lingui extract --clean
```

This command should no longer be necessary to run once the bug in Crowdin is fixed.

## License

@warp-ds/vue is available under the [Apache-2.0 software license](https://github.com/warp-ds/vue/blob/main/LICENSE).
