// lint-staged.config.js

module.exports = {
  // Type check TypeScript files
  '**/*.(ts|tsx)': () => 'yarn tsc --noEmit',

  '**/*.{html,json,jsx,js,ts,tsx}': (filenames) => [
    `yarn eslint --fix ${filenames.join(' ')}`,
    `yarn prettier --write ${filenames.join(' ')}`,
  ],

  '**/*.{css,less,scss}': (filenames) => [
    `yarn prettier --write ${filenames.join(' ')}`,
    `yarn stylelint --allow-empty-input "**/*.{css,scss} ${filenames.join(
      ' '
    )}`,
  ],

  // Format MarkDown and JSON
  '**/*.(md|json)': (filenames) =>
    `yarn prettier --write ${filenames.join(' ')}`,
}
