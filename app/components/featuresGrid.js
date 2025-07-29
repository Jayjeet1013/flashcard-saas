import {
  Box,
  Grid,
  Typography,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { featureDescriptions } from "../../utils/featureDescriptions";
import { motion } from "framer-motion";
import {
  TextFields,
  Psychology,
  CloudSync,
  TrendingUp,
  Speed,
  Security,
} from "@mui/icons-material";

const FeatureGridItem = ({ title, description, index }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Icon mapping based on title
  const getIcon = (title) => {
    if (title.includes("Text")) return <TextFields />;
    if (title.includes("Smart")) return <Psychology />;
    if (title.includes("Accessible")) return <CloudSync />;
    return <TrendingUp />;
  };

  const getGradient = (index) => {
    const gradients = [
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    ];
    return gradients[index % gradients.length];
  };

  return (
    <Grid
      item
      xs={12}
      md={4}
      sx={{
        display: "flex",
        justifyContent: "center",
        color: "white",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
        whileHover={{ y: -8, scale: 1.02 }}
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
            minHeight: 280,
            background:
              "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
            border: "1px solid rgba(92, 132, 248, 0.2)",
            borderRadius: 4,
            boxShadow: "0 15px 35px rgba(0, 0, 0, 0.3)",
            position: "relative",
            overflow: "hidden",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              border: "1px solid rgba(92, 132, 248, 0.4)",
              boxShadow: "0 25px 50px rgba(92, 132, 248, 0.15)",
              "&::before": {
                opacity: 1,
              },
            },
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: getGradient(index),
              opacity: 0,
              transition: "opacity 0.4s ease",
              zIndex: -1,
            },
            "&::after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.7)",
              zIndex: -1,
            },
          }}
        >
          {/* Icon */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #5c84f8 0%, #4f46e5 100%)",
              boxShadow: "0 10px 30px rgba(92, 132, 248, 0.4)",
              mb: 3,
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                inset: -2,
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, #5c84f8, #4f46e5, #7c3aed)",
                zIndex: -1,
              },
            }}
          >
            <Box sx={{ color: "white", fontSize: 32 }}>{getIcon(title)}</Box>
          </Box>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "white",
              mb: 2,
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
            }}
          >
            {title}
          </Typography>

          <Box
            sx={{
              width: 50,
              height: 3,
              background: "linear-gradient(135deg, #5c84f8 0%, #4f46e5 100%)",
              borderRadius: 2,
              mb: 3,
            }}
          />

          <Typography
            sx={{
              color: "rgba(255, 255, 255, 0.8)",
              lineHeight: 1.6,
              fontSize: "1rem",
              textShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
            }}
          >
            {description}
          </Typography>
        </Box>
      </motion.div>
    </Grid>
  );
};

const FeatureGrid = () => {
  return (
    <Box
      sx={{
        py: { xs: 6, sm: 8, md: 10 },
        px: { xs: 2, sm: 4 },
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "20%",
          left: "10%",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(92, 132, 248, 0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: "20%",
          right: "10%",
          width: 150,
          height: 150,
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
            Powerful Features
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
            Discover the tools that make FlashLoom the ultimate learning
            companion
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
        {featureDescriptions.map((feature, index) => (
          <FeatureGridItem key={index} {...feature} index={index} />
        ))}
      </Grid>
    </Box>
  );
};

export default FeatureGrid;
