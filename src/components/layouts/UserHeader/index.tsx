import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Hidden, IconButton, Link as MuiLink } from "@mui/material";
import { LanguageToggle } from "components/common/LanguageToggle";
import { Logo } from "components/common/Logo";
import MobileNavbarDrawer from "components/common/MobileNavbarDrawer";
import { ThemeToggle } from "components/common/ThemeToggle";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { kebabCaseToCapitalize } from "utils/kebab-case-to-capitalize";
import { menu } from "./menu";

export const UserHeader = () => {
  const [isMobileNavbarDrawerOpen, setIsMobileNavbarDrawerOpen] =
    useState<boolean>(false);

  const { query } = useRouter();

  console.log({ query });

  return (
    <Box
      component="header"
      sx={{
        height: 60,
        px: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid",
        borderColor: "divider",
        position: "sticky",
        top: 0,
        left: 0,
        zIndex: "appBar",
        bgcolor: "background.default",
      }}
    >
      <Link href="/">
        <Logo />
      </Link>
      <Hidden smDown>
        <Box display={"flex"} gap={3}>
          {menu.map(({ title, href }, idx) => (
            <MuiLink
              color={"text.primary"}
              href={href}
              component={Link}
              underline="none"
              key={idx}
              fontWeight={
                kebabCaseToCapitalize(query.body_part as string) === title
                  ? "bold"
                  : 400
              }
            >
              {title}
            </MuiLink>
          ))}
        </Box>
      </Hidden>

      <Box>
        <LanguageToggle />
        <ThemeToggle />
        <Hidden smUp>
          <IconButton
            sx={{ px: 0 }}
            onClick={() => setIsMobileNavbarDrawerOpen((prev) => !prev)}
          >
            {!isMobileNavbarDrawerOpen ? (
              <MenuIcon fontSize="large" />
            ) : (
              <CloseIcon fontSize="large" />
            )}
          </IconButton>
        </Hidden>
      </Box>
      <MobileNavbarDrawer
        isDrawer={isMobileNavbarDrawerOpen}
        setIsDrawer={setIsMobileNavbarDrawerOpen}
      />
    </Box>
  );
};
