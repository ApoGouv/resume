# My Personal Resume

Build with React + TypeScript + Vite and fueled by lots of ☕ (or even 🍺 sometimes).

Data are loaded from `.json` files, with one for each language to support multilingual resume content.

The app features a responsive design, providing a one-page layout with dimensions similar to an A4 paper, ensuring compatibility on both desktop and PDF files.

## Key Features 🎛️

- [x] **Light and Dark Mode** 🌞/🌕: Seamlessly switch between light and dark themes for optimal readability.
- [x] **Multilingual Support** 🇬🇷/🇺🇸: Available in Greek and English languages.
- [x] **PDF Downloads** 📄: Easily download resume in pdf format in two variations (colored and grayscale) for each supported language.
- [x] **Quick Print** 🖨️: Conveniently print your resume with a single click.
- [x] **Mobile Tweaks** 🎛️ : Conditionally change render order of components on mobile devices.
- [x] **Local Google Fonts** ℹ️ : We load Google Fonts locally to improve page loading times and avoid flashes of unstyled text (FOUT).
- [x] **Expanded View** ℹ️ : Menu button that enable or disable the Expanded View (EV). During EV, we reveal more information regarding projects in a particular work. Also we make the profile as sticky when EV is enabled and we are on desktop. Finally, EV is not available when printing.
- [x] **Routing** 🔖 Added second locale (en-US) to it's own route `/en` and introduced 404 error documents for non specified routes. With separate routes by locale we can now share and/or bookmark the resume to specific locale.

## Todo 📝

- [-] Expanded View (EV) Additions
  - [ ] Consider revealing additional components like projects to showcase personal projects and achievements.
- [ ] Add social media meta tags for Facebook and Twitter to improve the shareability and visibility of the resume.
- [ ] Make it offline ready (PWA).
- [ ] Add test coverage by implementing Vitest for comprehensive testing of the application.


## Getting Started 🏁


### Build with 🧰

#### Frameworks and Libraries

- [React](https://github.com/facebook/react#readme): A JavaScript library for building user interfaces.
- [React Helmet Async](https://github.com/staylor/react-helmet-async#readme): A library for managing document head tags in React.
- [React Icons](https://react-icons.github.io/react-icons/): A library for including popular icons in React projects.
- [country-flag-icons](https://gitlab.com/catamphetamine/country-flag-icons#readme): A set of SVG country flag icons for use in web projects.
- [Fontsource](https://github.com/fontsource/fontsource#readme): An updating monorepo full of self-hostable Open Source fonts bundled into individual NPM packages!
- [React Router DOM](https://github.com/remix-run/react-router#readme): React Router is a lightweight, fully-featured routing library for the React JavaScript library.


#### Automation

- [Playwright](https://playwright.dev/docs/library): A Node library for automating browsers.
- [@playwright/browser-chromium](https://playwright.dev/docs/library#key-differences): Chromium-specific Playwright library for browser automation.


#### Build Tools and Utilities

- [Vite](https://github.com/vitejs/vite#readme): A fast build tool for modern web development.
- [TypeScript](https://github.com/microsoft/TypeScript/#readme): A superset of JavaScript that adds static types to the language.
- [ESLint](https://github.com/eslint/eslint#readme): A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- [PostCSS](https://github.com/postcss/postcss#readme): A tool for transforming CSS with JavaScript plugins.
- [Autoprefixer](https://github.com/postcss/autoprefixer#readme): A PostCSS plugin to parse CSS and add vendor prefixes to CSS rules using values from Can I Use.
- [Prettier](https://github.com/prettier/prettier#readme): A tool for automatically formatting code to ensure consistent style and formatting.
- [gh-pages](https://github.com/tschaub/gh-pages#readme): A convenient tool for deploying your project to GitHub Pages with minimal configuration. With `gh-pages`, you can seamlessly publish your static websites, React applications, or any other web projects directly from your GitHub repository to a dedicated GitHub Pages branch, making it accessible to the world with just a few simple commands.
- [vite-plugin-svgr]: Vite plugin to transform SVGs into React components. Uses [svgr](https://github.com/gregberge/svgr) under the hood.


### Installation 🚧

1. Clone this repo.
2. Navigate to the project directory and install dependencies:
  ```shell
  cd ./resume
  npm install
  ```
3. Modify the `.json` files located in `./src/Data` with your personal information.

> Some sections/entries in the data files are omitted from rendering. **This is by design as I wanted to fit the basic information on one page**. However, there will be a future version that will display all `non-hidden` entries upon request, for online view*. The PDFs will still be in the one-page version.


### Running the app 🚀

To run the app locally, use the following command:

```shell
npm run dev

```

The app will be accessible at: `http://localhost:5174/` by default.



#### Available scripts 🔧

- **npm run dev**: Starts the development server using Vite.

- **npm run gen-pdfs**: Calls the generatePDF script, that generates images and PDFs of the resume app for both locales. The generated files are stored in the `/public/img` and `/public/pdf` directories respectively. This script requires `npm run dev` to be running as it uses Playwright to open a headless Chromium browser to our local dev address `http://localhost:5174/`.

- **npm run dev:gen-pdfs**: Calls the generatePDF script with CLI arguments in order to also run the Vite den server first and then proceed with the pdf generation. This script generates the images and PDFs of the resume.

- **npm run lint**: Runs ESLint to lint TypeScript and TSX files and report any errors.

- **npm run build**: Builds the project for production using Vite.

- **npm run preview**: Locally previews the production build using Vite.

- **predeploy**: Runs the `dev:gen-pdfs` script to generate images and PDFs of the resume app, and then builds the project using `npm run build`. This script is used automatically before deploying our application to ensure that the latest changes are included in the build.

- **deploy**: Deploys the built project to GitHub Pages using the `gh-pages` package. It uploads the contents of the `dist` directory to a dedicated branch, making our application accessible via GitHub Pages.



## Kudos (in alphabetical order) 🫡

During my research for other resume apps built with React, I came across two standout projects that served as great inspiration for my own:

So, **kudos** to these talented developers!

| Real Name       | GitHub Name | GitHub Resume Repo                                            |
|-----------------|-------------|---------------------------------------------------------------|
| Matias Lagos    | @Maaato     | [Maaato/react-resume](https://github.com/Maaato/react-resume) |
| Shashank Sharma | @geekyorion | [geekyorion/resume](https://github.com/geekyorion/resume)     |


## Acknowledgements ✨

Special thanks to the following individuals for their inspiring designs and resources used in this project:

- **Vinod Jangid**: Thanks to [Vinod Jangid](https://github.com/vinodjangid07) for the [amazing button design](https://uiverse.io/vinodjangid07/evil-chicken-13) that I used on the 404 not found page. Check out his GitHub profile for more fantastic work!
