<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://osmosis.imperator.co/">
    <img src="public/logo.webp" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Osmosis - Info</h3>

  <p align="center">
    An analytics interface for Osmosis AMM.
    <br />
    <a href="https://osmosis.imperator.co/">View Demo</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
      <li>
      <a href="#git-workflow">Git workflow</a>
      <ul>
        <li><a href="#branchs">Branches</a></li>
      </ul>
      </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Screenshot](./screenshot.png)](https://osmosis.imperator.co/)

Osmosis is a decentralized protocol for exchanging cryptomaies based on Cosmos.
This project allow to display and make accessible all the information relating to Osmosis.

### Built With

- [ReactJS](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [NextJS](https://nextjs.org/)
- [Mobx](https://mobx.js.org/README.html)
- [Tailwindcss](https://tailwindcss.com/)
- [Tradingview](https://www.tradingview.com/)
- [Osmosis API](https://api-osmosis.imperator.co/swagger/)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

No prerequisites is need except NPM or YARN.

### Installation

1. Install packages

   ```sh
    yarn
   ```

   or

   ```sh
   npm install
   ```

2. Run it

   ```sh
    yarn dev
   ```

   or

   ```sh
   npm run dev
   ```

## Git workflow

To organize git workflow [git flow](http://danielkummer.github.io/git-flow-cheatsheet/) is used.

### Branches

- **main**: It's the current version of production web site.
- **develop**: It's branch who is used to create news features and contains next features.
- **feature/xxx**: It's used to create new feature.
- **release/xxx**: It's the link between _develop_ branch and _main_ branch. It contains the next version of main website. It usually used for pre-production website for testing purpose.
- **hotfix/xxx**: It's used to quickly fix bugs on the _main_ branch.
- **theme/xxx**: It's just to save theme. Themes are developped in _feature/xxx_ first, after being pushed in production, they are placed in _theme/xxx_ branch.
