"use client";
import {
  Box,
  Grid,
  Typography,
  Button,
  Divider,
  useTheme,
  useMediaQuery,
  Chip,
} from "@mui/material";
import { pricingDescriptions } from "../../utils/pricingDescriptions";
import getStripe from "@/utils/get-stripe";
import { motion } from "framer-motion";
import {
  Star,
  CheckCircle,
  Rocket,
  TrendingUp,
  LocalOffer,
} from "@mui/icons-material";

const PricingGridItem = ({ title, price, description, fee, index }) => {
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

  const getIcon = (title) => {
    if (title.includes("Free")) return <LocalOffer />;
    if (title.includes("Basic")) return <CheckCircle />;
    if (title.includes("Pro")) return <Star />;
    return <TrendingUp />;
  };

  const isPopular = title.includes("Pro");
  const isFree = fee === 0;

  return (
    <Grid
      item
      xs={12}
      md={4}
      lg={4}
      sx={{ display: "flex", justifyContent: "center", color: "white" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ y: -10, scale: 1.02 }}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            minHeight: 400,
            background: isPopular
              ? "linear-gradient(135deg, #5c84f8 0%, #4f46e5 50%, #7c3aed 100%)"
              : "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
            border: isPopular
              ? "2px solid #5c84f8"
              : "1px solid rgba(92, 132, 248, 0.2)",
            borderRadius: 4,
            boxShadow: isPopular
              ? "0 25px 50px rgba(92, 132, 248, 0.3)"
              : "0 15px 35px rgba(0, 0, 0, 0.3)",
            position: "relative",
            overflow: "hidden",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              border: isPopular
                ? "2px solid #4f46e5"
                : "1px solid rgba(92, 132, 248, 0.4)",
              boxShadow: isPopular
                ? "0 30px 60px rgba(92, 132, 248, 0.4)"
                : "0 25px 50px rgba(92, 132, 248, 0.15)",
            },
            "&::before": isPopular
              ? {
                  content: '""',
                  position: "absolute",
                  top: -2,
                  left: -2,
                  right: -2,
                  bottom: -2,
                  background:
                    "linear-gradient(135deg, #5c84f8, #4f46e5, #7c3aed, #5c84f8)",
                  borderRadius: "inherit",
                  zIndex: -1,
                  animation: "rotate 3s linear infinite",
                }
              : {},
          }}
        >
          {/* Popular Badge */}
          {isPopular && (
            <Chip
              label="Most Popular"
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "rgba(255, 255, 255, 0.2)",
                color: "white",
                fontWeight: 600,
                backdropFilter: "blur(10px)",
              }}
            />
          )}

          {/* Icon */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 70,
              height: 70,
              borderRadius: "50%",
              background: isPopular
                ? "rgba(255, 255, 255, 0.2)"
                : "linear-gradient(135deg, #5c84f8 0%, #4f46e5 100%)",
              backdropFilter: isPopular ? "blur(10px)" : "none",
              boxShadow: isPopular
                ? "0 8px 25px rgba(255, 255, 255, 0.1)"
                : "0 10px 30px rgba(92, 132, 248, 0.4)",
              mb: 3,
            }}
          >
            <Box sx={{ color: "white", fontSize: 30 }}>{getIcon(title)}</Box>
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "white",
              mb: 1,
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: isPopular ? "white" : "#5c84f8",
              mb: 3,
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
            }}
          >
            {price}
          </Typography>

          <Box
            sx={{
              width: 60,
              height: 3,
              background: isPopular
                ? "rgba(255, 255, 255, 0.3)"
                : "linear-gradient(135deg, #5c84f8 0%, #4f46e5 100%)",
              borderRadius: 2,
              mb: 3,
            }}
          />

          <Typography
            sx={{
              color: isPopular
                ? "rgba(255, 255, 255, 0.9)"
                : "rgba(255, 255, 255, 0.8)",
              lineHeight: 1.6,
              fontSize: "1rem",
              mb: 4,
              flex: 1,
              display: "flex",
              alignItems: "center",
              textShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
            }}
          >
            {description}
          </Typography>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ width: "100%" }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={selectPlan}
              disabled={isFree}
              sx={{
                width: "100%",
                py: 1.5,
                borderRadius: 3,
                fontWeight: 600,
                fontSize: "1rem",
                background: isPopular
                  ? "rgba(255, 255, 255, 0.2)"
                  : isFree
                  ? "rgba(92, 132, 248, 0.3)"
                  : "linear-gradient(135deg, #5c84f8 0%, #4f46e5 100%)",
                backdropFilter: isPopular ? "blur(10px)" : "none",
                border: isPopular
                  ? "1px solid rgba(255, 255, 255, 0.3)"
                  : "none",
                color: "white",
                boxShadow: isFree
                  ? "none"
                  : isPopular
                  ? "0 8px 25px rgba(255, 255, 255, 0.1)"
                  : "0 8px 25px rgba(92, 132, 248, 0.3)",
                transition: "all 0.3s ease",
                "&:hover": isFree
                  ? {}
                  : {
                      background: isPopular
                        ? "rgba(255, 255, 255, 0.3)"
                        : "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                      boxShadow: isPopular
                        ? "0 10px 30px rgba(255, 255, 255, 0.2)"
                        : "0 10px 30px rgba(92, 132, 248, 0.4)",
                      transform: "translateY(-1px)",
                    },
                "&:disabled": {
                  color: "rgba(255, 255, 255, 0.5)",
                  cursor: "not-allowed",
                },
              }}
            >
              {isFree ? "Free Forever" : `Choose ${title}`}
            </Button>
          </motion.div>
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
        py: { xs: 6, sm: 8, md: 10 },
        px: { xs: 2, sm: 4 },
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "30%",
          left: "5%",
          width: 150,
          height: 150,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(92, 132, 248, 0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: "30%",
          right: "5%",
          width: 120,
          height: 120,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124, 58, 237, 0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        },
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 6, sm: 8 },
            position: "relative",
            zIndex: 1,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              background:
                "linear-gradient(135deg, #5c84f8 0%, #4f46e5 50%, #7c3aed 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 700,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              mb: 2,
              textShadow: "0 4px 12px rgba(92, 132, 248, 0.3)",
            }}
          >
            Choose Your Plan
          </Typography>
          <Typography
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: { xs: "1rem", sm: "1.1rem" },
              maxWidth: 600,
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            Start free and scale as you grow. No hidden fees, cancel anytime.
          </Typography>
        </Box>
      </motion.div>

      <Grid
        container
        spacing={4}
        sx={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1200,
          mx: "auto",
        }}
      >
        {pricingDescriptions.map((pricing, index) => (
          <PricingGridItem key={pricing.title} {...pricing} index={index} />
        ))}
      </Grid>

      {/* Add keyframes for the rotating border */}
      <style jsx global>{`
        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </Box>
  );
};

export default PricingGrid;
