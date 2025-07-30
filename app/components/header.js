"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AutoAwesome, DashboardCustomize } from "@mui/icons-material";

const Header = () => {
  const router = useRouter();

  return (
    <AppBar
      position="fixed"
      sx={{
        background: "rgba(10, 10, 10, 0.8)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(92, 132, 248, 0.1)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          py: { xs: 0.5, sm: 1 },
          px: { xs: 1, sm: 2 },
          minHeight: { xs: 56, sm: 64 },
        }}
      >
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={() => router.push("/")}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, sm: 1.5 },
              px: { xs: 1.5, sm: 2 },
              py: { xs: 0.5, sm: 1 },
              borderRadius: 3,
              background:
                "linear-gradient(135deg, rgba(92, 132, 248, 0.1) 0%, rgba(79, 70, 229, 0.1) 100%)",
              border: "1px solid rgba(92, 132, 248, 0.2)",
              transition: "all 0.3s ease",
              "&:hover": {
                background:
                  "linear-gradient(135deg, rgba(92, 132, 248, 0.2) 0%, rgba(79, 70, 229, 0.2) 100%)",
                border: "1px solid rgba(92, 132, 248, 0.4)",
              },
            }}
          >
            <AutoAwesome
              sx={{ color: "#5c84f8", fontSize: { xs: 20, sm: 24 } }}
            />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1.2rem", sm: "1.5rem" },
                background: "linear-gradient(135deg, #5c84f8 0%, #4f46e5 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              FlashLoom
            </Typography>
          </Button>
        </motion.div>

        <SignedOut>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, sm: 2 },
            }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outlined"
                onClick={() => router.push("sign-in")}
                sx={{
                  borderRadius: 3,
                  px: { xs: 2, sm: 3 },
                  py: { xs: 0.5, sm: 1 },
                  fontSize: { xs: "0.8rem", sm: "0.875rem" },
                  border: "1px solid rgba(92, 132, 248, 0.3)",
                  color: "#5c84f8",
                  fontWeight: 600,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    border: "1px solid #5c84f8",
                    background: "rgba(92, 132, 248, 0.1)",
                  },
                }}
              >
                Login
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                onClick={() => router.push("sign-up")}
                sx={{
                  borderRadius: 3,
                  px: { xs: 2, sm: 3 },
                  py: { xs: 0.5, sm: 1 },
                  fontSize: { xs: "0.8rem", sm: "0.875rem" },
                  background:
                    "linear-gradient(135deg, #5c84f8 0%, #4f46e5 100%)",
                  fontWeight: 600,
                  boxShadow: "0 4px 15px rgba(92, 132, 248, 0.3)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                    boxShadow: "0 6px 20px rgba(92, 132, 248, 0.4)",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                Sign up
              </Button>
            </motion.div>
          </Box>
        </SignedOut>

        <SignedIn>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, sm: 2 },
            }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                startIcon={
                  <DashboardCustomize sx={{ fontSize: { xs: 16, sm: 20 } }} />
                }
                onClick={() => router.push("/flashcards")}
                sx={{
                  borderRadius: 3,
                  px: { xs: 2, sm: 3 },
                  py: { xs: 0.5, sm: 1 },
                  fontSize: { xs: "0.8rem", sm: "0.875rem" },
                  background:
                    "linear-gradient(135deg, #5c84f8 0%, #4f46e5 100%)",
                  fontWeight: 600,
                  boxShadow: "0 4px 15px rgba(92, 132, 248, 0.3)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                    boxShadow: "0 6px 20px rgba(92, 132, 248, 0.4)",
                    transform: "translateY(-1px)",
                  },
                  "& .MuiButton-startIcon": {
                    marginRight: { xs: 0.5, sm: 1 },
                  },
                }}
              >
                <Box
                  component="span"
                  sx={{ display: { xs: "none", sm: "inline" } }}
                >
                  My Flashcards
                </Box>
                <Box
                  component="span"
                  sx={{ display: { xs: "inline", sm: "none" } }}
                >
                  Cards
                </Box>
              </Button>
            </motion.div>
            <Box
              sx={{
                p: { xs: 0.25, sm: 0.5 },
                borderRadius: 2,
                background:
                  "linear-gradient(135deg, rgba(92, 132, 248, 0.1) 0%, rgba(79, 70, 229, 0.1) 100%)",
                border: "1px solid rgba(92, 132, 248, 0.2)",
              }}
            >
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: {
                      width: { xs: "28px", sm: "32px" },
                      height: { xs: "28px", sm: "32px" },
                    },
                  },
                }}
              />
            </Box>
          </Box>
        </SignedIn>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
