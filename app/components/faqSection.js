import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { FAQs } from "../../utils/faqs";
import { motion } from "framer-motion";

const FaqItem = ({ question, answer }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Box
        sx={{
          p: 4,
          border: "1px solid #333",
          borderRadius: 3,
          backgroundColor: "#1e1e1e",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
          color: "white",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          "&:hover": {
            backgroundColor: "#292929",
          },
        }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ color: "#5c84f8" }}>
          {question}
        </Typography>
        <Typography>{answer}</Typography>
      </Box>
    </motion.div>
  );
};

const FaqSection = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        px: isSmallScreen ? 2 : 5,
        py: 5,
        backgroundColor: "#121212",
        borderRadius: 4,
      }}
    >
      <Typography
        variant="h4"
        color="#5c84f8"
        fontWeight="bold"
        textAlign="center"
        sx={{ mb: 4 }}
      >
        FAQs
      </Typography>
      {FAQs.map((faq, index) => (
        <FaqItem key={index} {...faq} />
      ))}
    </Box>
  );
};

export default FaqSection;
