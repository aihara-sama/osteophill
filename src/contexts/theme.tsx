import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import React from "react";
import { createTheme, ThemeType } from "theme/index";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
  const { children } = props;
  const [currentTheme] = React.useState<ThemeType>("light");

  return (
    <MuiThemeProvider theme={createTheme(currentTheme)}>
      {children}
    </MuiThemeProvider>
  );
};
