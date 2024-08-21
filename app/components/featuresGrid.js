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

const FeatureGridItem = ({ title, description }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: isSmallScreen ? "100%" : "90%",
        }}
      >
        <Box
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            minHeight: 200,
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
            border: "1px solid #333",
            borderRadius: 3,
            backgroundColor: "#1e1e1e",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "#292929",
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#5c84f8" }}
          >
            {title}
          </Typography>
          <Divider sx={{ my: 2, borderColor: "#5c84f8" }} />
          <Typography>{description}</Typography>
        </Box>
      </motion.div>
    </Grid>
  );
};

const FeatureGrid = () => {
  return (
    <Box sx={{ px: 3, py: 5, backgroundColor: "#121212", borderRadius: 4 }}>
      <Typography
        variant="h4"
        color={"#5c84f8"}
        sx={{ mb: 4, fontWeight: "bold", textAlign: "center" }}
      >
        Features
      </Typography>
      <Grid container spacing={3}>
        {featureDescriptions.map((feature, index) => (
          <FeatureGridItem key={index} {...feature} />
        ))}
      </Grid>
    </Box>
  );
};

export default FeatureGrid;
