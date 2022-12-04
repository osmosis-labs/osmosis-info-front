<!-- PROJECT LOGO -->
<br />
<p align="center">
  <img src="./logo.webp" alt="Logo" width="80" height="80">

  <h3 align="center">Osmosis info</h3>

  <p align="center">
    Osmosis info repository
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
      <a href="#getting-started">Packages</a>
      <ul>
        <li><a href="#OsmosisInfoUI">Osmosis Info UI</a></li>
        <li><a href="#Website">Website</a></li>
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

## About The Project

Osmosis is a decentralized protocol for exchanging cryptomaies based on Cosmos.
This project allow to display and make accessible all the information relating to Osmosis.

### Built With

- [Lerna](https://lerna.js.org/) Lerna is used to manage multiple package in same repository

## Packages

- osmosis-info-ui: it's the package used for osmosis info website. It provide the base UI component.
- website: contains the osmosis-info website

## Git workflow

To organize git workflow [git flow](http://danielkummer.github.io/git-flow-cheatsheet/) is used.

### Branches

- **main**: It's the current version of package.
- **develop**: It's branch who is used to create news features and contains next features.
- **feature/xxx**: It's used to create new feature.
- **release/xxx**: It's the link between _develop_ branch and _main_ branch. It contains the next version of main website. It usually used for pre-production website for testing purpose.
- **hotfix/xxx**: It's used to quickly fix bugs on the _main_ branch.
