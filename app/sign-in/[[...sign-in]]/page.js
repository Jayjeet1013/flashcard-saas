import Header from '@/app/components/header'
import { SignIn } from '@clerk/nextjs'
import { Box } from '@mui/material'

export default function Page() {
  return (
    <Box 
        sx={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}
    >
        <Header />
        <SignIn />
    </Box>
  )
}