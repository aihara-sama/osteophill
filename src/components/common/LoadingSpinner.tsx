import type { BoxProps } from "@mui/material";
import { Box } from "@mui/material";
import React from "react";
import { TailSpin } from "react-loader-spinner";

interface LoadingSpinnerProps {
  color?: string;
  height?: number;
  width?: number;
  BoxProps?: BoxProps;
  SpinnerProps?: { [key: string]: string | number };
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = (props) => {
  const {
    color = "#ee4e34",
    height = 36,
    width = 36,
    BoxProps = {},
    SpinnerProps = {},
  } = props;
  return (
    <Box
      data-testid="loading-spinner"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
      {...BoxProps}
    >
      <TailSpin color={color} height={height} width={width} {...SpinnerProps} />
    </Box>
  );
};

export default LoadingSpinner;
