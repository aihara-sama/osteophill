module.exports = {
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "eslint"],
  "**/*!(.test).ts?(x)": () => "npm run check-types",
  "*.{js,jsx,ts,tsx,json,yaml}": ["prettier --write"],
};
