# My personal resume

Build with React + TypeScript + Vite + lots of ☕ or even 🍺 sometimes.

Data are loading from a `.json` file. One for each language.

The resume app is responsive. 
One page layout with dimentions of an A4 paper (on desktop and pdf files).


- [x] Light and Dark mode 🌞/🌕
- [x] Greek and English languages 🇬🇷/🇺🇸
- [x] PDF download in two variations, colored and/or grayscaled, for each language 🗎
- [x] Quick Print 🖨️


## Todo 🗒️

- [ ] Toggle full detailed resume presentation for online view only. The pdfs will still have the one page version.
  - [ ] Work expirience will show in more details project entries.
  - [ ] Propably will reveal other components like Projets, to display personal projetcs.
  - [ ] Maybe add some functionality to prevent printing of detailed version? Will leave this for last!
- [ ] Maybe add FaceBook and Twitter meta.
- [ ] Add test coverage with Vitest.


## Getting Started 🏁


### Build with 🧰

- [React](https://github.com/facebook/react#readme)
- [React-helmet-async](https://github.com/staylor/react-helmet-async#readme)
- [React Icons](https://react-icons.github.io/react-icons/)
- [country-flag-icons](https://gitlab.com/catamphetamine/country-flag-icons#readme)
- [Playwright](https://playwright.dev/docs/library)
- [@playwright/browser-chromium](https://playwright.dev/docs/library#key-differences)

- [Vite](https://github.com/vitejs/vite#readme)
- [TypeScript](https://github.com/microsoft/TypeScript/#readme)
- [ESLint](https://github.com/eslint/eslint#readme)
- [PostCSS](https://github.com/postcss/postcss#readme)
- [Autoprefixer](https://github.com/postcss/autoprefixer#readme)
- [Prettier](https://github.com/prettier/prettier#readme)

### Installation 🚧

1. Clone this repo.
2. 
```shell
cd ./resume
npm install
```
3. Modify `.json` files in: `./src/Data` with your personal information.
> Some sections / entries in the data files are ommited from rendering. **This is by design as I wanted to fit the basic information in one page**. 
> However, there will be a future version that will display all `non hidden` entries upon request, for online view*. The pdfs will still be on the one page version.


### Running the app 🚀

```shell
npm run dev

```
App will run locally on: `http://localhost:5174/` , by default.

#### Available scripts 🔧

```shell
# Tells Vite to start the development server.
npm run dev
```

```shell
# Generates images and pdfs of the resume app for both locales.
# The generated files are stored in the /public/img and 
# /public/pdf directories respectively.
# /!\ This script requires `npm run dev` to be running as it uses
# playwright to open a headless chromium browser to our local 
# dev address `http://localhost:5174/`.
npm run gen-pdfs
```

```shell
# This will run both `npm run dev` and `npm run gen-pdfs` in parallel
# with a delay of 3 seconds before calling the second script and will 
# generate the images and pdfs of the resume.
npm run dev:gen-pdfs
```

```shell
# Runs ESLint to out ts and tsx files and report any errors.
npm run lint
```

```shell
# Tells Vite to build for production.
npm run build
```

```shell
# Tells Vite to locally preview the production build.
npm run preview
```


## Kudos (in alphabetical order) 🫡

During my research for other resume apps built with React, I came across two standout projects that served as great inspiration for my own:

So, **kudos** to these talented developers!

| Real Name       | GitHub Name | GitHub Resume Repo                                            |
|-----------------|-------------|---------------------------------------------------------------|
| Matias Lagos    | @Maaato     | [Maaato/react-resume](https://github.com/Maaato/react-resume) |
| Shashank Sharma | @geekyorion | [geekyorion/resume](https://github.com/geekyorion/resume)     |


