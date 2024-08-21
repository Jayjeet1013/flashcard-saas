"use client";
import {
  Box,
  Grid,
  Typography,
  Button,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { pricingDescriptions } from "../../utils/pricingDescriptions";
import getStripe from "@/utils/get-stripe";
import { motion } from "framer-motion";

const PricingGridItem = ({ title, price, description, fee }) => {
  const selectPlan = async () => {
    const checkoutSession = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        origin: "localhost:3000",
        fee: fee,
      },
    });
    const checkoutSessionJson = await checkoutSession.json();

    if (checkoutSession.statusCode == 500) {
      console.error(checkoutSession.message);
      return;
    }

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };

  return (
    <Grid
      item
      xs={12}
      md={4}
      lg={4}
      sx={{ display: "flex", justifyContent: "center", color: "white" }}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Box
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: 280,
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
            border: "1px solid #333",
            borderRadius: 5,
            backgroundColor: "#1e1e1e",
            "&:hover": {
              backgroundColor: "#292929",
            },
          }}
        >
          <Typography variant="h6" fontWeight="bold" sx={{ color: "#5c84f8" }}>
            {title}
          </Typography>
          <Divider sx={{ bgcolor: "#5c84f8", mb: 2 }} />
          <Typography variant="h5" sx={{ mb: 1 }}>
            {price}
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            {description}
          </Typography>
          <Button
            variant="contained"
            size="medium"
            onClick={selectPlan}
            sx={{
              backgroundColor: "#5c84f8",
              "&:hover": {
                backgroundColor: "#4b72d6",
              },
            }}
          >
            Choose {title}
          </Button>
        </Box>
      </motion.div>
    </Grid>
  );
};

const PricingGrid = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        py: 5,
        px: isSmallScreen ? 2 : 5,
        backgroundColor: "#121212",
        borderRadius: 4,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          color: "#5c84f8",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Pricing
      </Typography>
      <Grid container spacing={3}>
        {pricingDescriptions.map((pricing) => (
          <PricingGridItem key={pricing.title} fee={pricing.fee} {...pricing} />
        ))}
      </Grid>
    </Box>
  );
};

export default PricingGrid;
