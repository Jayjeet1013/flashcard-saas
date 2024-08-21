'use client'

import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

const Header = () => {

    const router = useRouter(); 
    return (
      <AppBar
        sx={{
          backgroundColor: "rgb(30 30 30)",
          mb: 10,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={() => router.push("/")}>
            <Typography variant="h6" color="white">
              FlashLoom
            </Typography>
          </Button>
          <SignedOut>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                color="primary"
                variant="contained"
                sx={{
                  mr: 2,
                  borderRadius: 8,
                }}
                onClick={() => router.push("sign-in")}
              >
                Login
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={() => router.push("sign-up")}
                sx={{
                  borderRadius: 8,
                }}
              >
                Sign up
              </Button>
            </Box>
          </SignedOut>
          <SignedIn>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                color="primary"
                variant="contained"
                onClick={() => router.push("/flashcards")}
                sx={{
                  borderRadius: 8,
                  mr: { xs: 0, sm: 2 },
                }}
              >
                Your flashcards
              </Button>
              <UserButton />
            </Box>
          </SignedIn>
        </Toolbar>
      </AppBar>
    );
}

export default Header; 