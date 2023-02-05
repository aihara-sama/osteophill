import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { Box, Container } from "@mui/material";
import LoadingSpinner from "components/common/LoadingSpinner";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useEffect } from "react";
import { AdminHeader } from "./AdminHeader";

export const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { route } = useAuthenticator((context) => [context.route]);

  // Auth check
  useEffect(() => {
    if (route !== "authenticated") {
      router.push("/admin/login");
    }
  }, [route]);

  return route === "authenticated" ? (
    <Authenticator.Provider>
      <Box component="main" height="100%">
        <AdminHeader />
        <Container component="section" sx={{ height: "calc(100% - 100px)" }}>
          {children}
        </Container>
      </Box>
    </Authenticator.Provider>
  ) : (
    <LoadingSpinner />
  );
};
