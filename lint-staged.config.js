module.exports = {
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "eslint"],
  "**/*!(.cy).ts?(x)": () => "npm run check-types",
  "*.{js,jsx,ts,tsx,json,yaml}": ["prettier --write"],
};
