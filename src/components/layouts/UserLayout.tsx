import { Box, Container } from "@mui/material";
import type { FC, PropsWithChildren } from "react";
import { UserHeader } from "./UserHeader";

export const UserLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box component="main" height="100%">
      <UserHeader />
      <Container component="section" sx={{ height: "calc(100% - 60px)" }}>
        {children}
      </Container>
    </Box>
  );
};
