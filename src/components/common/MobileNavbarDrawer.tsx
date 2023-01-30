import Close from "@mui/icons-material/Close";
import { Box, Drawer, Hidden } from "@mui/material";
import Link from "next/link";
import type { FunctionComponent } from "react";
import React from "react";

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

  // ~~~~~ Cmp state ~~~~~

  // ~~~~~ Refs ~~~~~

  // ~~~~~ Effects ~~~~~

  // ~~~~~ Handlers ~~~~~
  const handleClose = () => {
    setIsDrawer(false);
  };
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
      </Drawer>
    </Hidden>
  );
};

export default MobileNavbarDrawer;
