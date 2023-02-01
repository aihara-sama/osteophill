import Close from "@mui/icons-material/Close";
import { Box, Drawer, Hidden, Link as MuiLink } from "@mui/material";
import { menu } from "components/layouts/UserHeader/menu";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FunctionComponent, useEffect } from "react";
import { kebabCaseToCapitalize } from "utils/kebab-case-to-capitalize";
import { Logo } from "./Logo";

interface IProps {
  isDrawer: boolean;
  setIsDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileNavbarDrawer: FunctionComponent<IProps> = ({
  isDrawer,
  setIsDrawer,
}) => {
  // ~~~~~ Redux state ~~~~~

  // ~~~~~ Hooks ~~~~~
  const { query } = useRouter();

  // ~~~~~ Cmp state ~~~~~

  // ~~~~~ Refs ~~~~~

  // ~~~~~ Handlers ~~~~~
  const handleClose = () => {
    setIsDrawer(false);
  };

  // ~~~~~ Effects ~~~~~
  useEffect(handleClose, [query]);

  return (
    <Hidden mdUp>
      <Drawer
        variant="temporary"
        open={isDrawer}
        onClose={() => setIsDrawer(false)}
        ModalProps={{
          keepMounted: true,
        }}
        data-testid="drawer__container"
        PaperProps={{
          sx: {
            width: { xs: "100%", sm: "390px" },
            backgroundColor: "background.profile",
            backgroundImage: "none",
            px: 4,
          },
        }}
      >
        <Box py={4} display="flex" justifyContent="space-between">
          <Link href="/">
            <Logo />
          </Link>
          <Box display="flex" justifyContent="end">
            <Close sx={{ cursor: "pointer" }} onClick={handleClose} />
          </Box>
        </Box>
        <Box display={"flex"} gap={3} flexDirection="column">
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
      </Drawer>
    </Hidden>
  );
};

export default MobileNavbarDrawer;
