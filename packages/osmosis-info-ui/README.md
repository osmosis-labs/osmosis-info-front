<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://story.osmosis.latouche.dev/">
    <img src="./logo.webp" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Osmosis info UI</h3>

  <p align="center">
    UI components for osmosis info.
    <br />
    <a href="https://beta.osmosis.latouche.dev/">View Demo</a>
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
        <li><a href="#Development">Development</a></li>
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

Osmosis is a decentralized protocol for exchanging cryptomaies based on Cosmos.
This project provide the base UI component to Osmosis info.

### Built With

- [ReactJS](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwindcss](https://tailwindcss.com/)

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

No prerequisites is need except NPM or YARN.

### Installation

1. Install packages

   ```sh
    yarn add @latouche/osmosis-info-ui
   ```

2. Run it

   ```sh
    yarn storybook
   ```

3. Import the styles in application on the root, like \_app.tsx

   ```sh
    import "@latouche/osmosis-info-ui/dist/styles.css";
   ...
   ```

4. Use components

   ```sh
    import React from "react";
    import { Button } from "@latouche/osmosis-info-ui";

    export defaut function Component() {
   	return (
   		<div>
   			<Button>Hello</Button>
   		</div>
   	);
   }
   ```

### Development

To get a local copy up and running follow these simple steps.

1. Clone the project

   ```sh
   git clone https://github.com/DLatouche/osmosis-info-ui.git
   ```

2. Install packages

   ```sh
    yarn
   ```

3. Start storybook

   ```sh
    yarn storybook
   ```

4. Create a new component with a story to display it

## Git workflow

To organize git workflow [git flow](http://danielkummer.github.io/git-flow-cheatsheet/) is used.

### Branches

- **main**: It's the current version of package.
- **develop**: It's branch who is used to create news features and contains next features.
- **feature/xxx**: It's used to create new feature.
- **release/xxx**: It's the link between _develop_ branch and _main_ branch. It contains the next version of main website. It usually used for pre-production website for testing purpose.
- **hotfix/xxx**: It's used to quickly fix bugs on the _main_ branch.
