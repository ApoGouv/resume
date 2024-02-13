# My Personal Resume

Build with React + TypeScript + Vite and fueled by lots of ☕ (or even 🍺 sometimes).

Data are loaded from `.json` files, with one for each language to support multilingual resume content.

The app features a responsive design, providing a one-page layout with dimensions similar to an A4 paper, ensuring compatibility on both desktop and PDF files.

## Key Features 🔑

- [x] **Light and Dark Mode** 🌞/🌕: Seamlessly switch between light and dark themes for optimal readability.
- [x] **Multilingual Support** 🇬🇷/🇺🇸: Available in Greek and English languages.
- [x] **PDF Downloads** 🗎: Easily download resume in pdf format in two variations (colored and grayscale) for each supported language.
- [x] **Quick Print** 🖨️: Conveniently print your resume with a single click.


## Todo 🗒️

- [ ] Implement a toggle for full detailed resume presentation in the online view only. This will enhance user experience by providing more comprehensive information while maintaining the one-page layout for PDFs.
  - [ ] Enhance the display of work experience to include more detailed project entries.
  - [ ] Consider revealing additional components like projects to showcase personal projects and achievements.
  - [ ] Explore options to prevent printing of the detailed version, if desired.
- [ ] Add social media meta tags for Facebook and Twitter to improve the shareability and visibility of the resume.
- [ ] Add test coverage by implementing Vitest for comprehensive testing of the application.


## Getting Started 🏁


### Build with 🧰

#### Frameworks and Libraries

- [React](https://github.com/facebook/react#readme): A JavaScript library for building user interfaces.
- [React Helmet Async](https://github.com/staylor/react-helmet-async#readme): A library for managing document head tags in React.
- [React Icons](https://react-icons.github.io/react-icons/): A library for including popular icons in React projects.
- [country-flag-icons](https://gitlab.com/catamphetamine/country-flag-icons#readme): A set of SVG country flag icons for use in web projects.


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

- **npm run gen-pdfs**: Generates images and PDFs of the resume app for both locales. The generated files are stored in the `/public/img` and `/public/pdf` directories respectively. This script requires `npm run dev` to be running as it uses Playwright to open a headless Chromium browser to our local dev address `http://localhost:5174/`.

- **npm run dev:gen-pdfs**: Runs both `npm run dev` and `npm run gen-pdfs` in parallel with a delay of 3 seconds before calling the second script. This script generates the images and PDFs of the resume.

- **npm run lint**: Runs ESLint to lint TypeScript and TSX files and report any errors.

- **npm run build**: Builds the project for production using Vite.

- **npm run preview**: Locally previews the production build using Vite.


## Kudos (in alphabetical order) 🫡

During my research for other resume apps built with React, I came across two standout projects that served as great inspiration for my own:

So, **kudos** to these talented developers!

| Real Name       | GitHub Name | GitHub Resume Repo                                            |
|-----------------|-------------|---------------------------------------------------------------|
| Matias Lagos    | @Maaato     | [Maaato/react-resume](https://github.com/Maaato/react-resume) |
| Shashank Sharma | @geekyorion | [geekyorion/resume](https://github.com/geekyorion/resume)     |


