import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Collapse,
  IconButton,
} from "@mui/material";
import { FAQs } from "../../utils/faqs";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  HelpOutline,
} from "@mui/icons-material";

const FaqItem = ({ question, answer, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -2 }}
    >
      <Box
        sx={{
          borderRadius: 4,
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          border: "1px solid rgba(92, 132, 248, 0.2)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
          overflow: "hidden",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            border: "1px solid rgba(92, 132, 248, 0.4)",
            boxShadow: "0 20px 40px rgba(92, 132, 248, 0.1)",
            transform: "translateY(-2px)",
          },
        }}
      >
        <Box
          onClick={toggleExpand}
          sx={{
            p: 3,
            display: "flex",
            alignItems: "center",
            gap: 2,
            cursor: "pointer",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "rgba(92, 132, 248, 0.05)",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #5c84f8 0%, #4f46e5 100%)",
              boxShadow: "0 4px 12px rgba(92, 132, 248, 0.3)",
              flexShrink: 0,
            }}
          >
            <HelpOutline sx={{ color: "white", fontSize: 20 }} />
          </Box>

          <Typography
            variant="h6"
            fontWeight="600"
            sx={{
              color: "white",
              flex: 1,
              fontSize: { xs: "1rem", sm: "1.1rem" },
              lineHeight: 1.4,
            }}
          >
            {question}
          </Typography>

          <IconButton
            sx={{
              color: "#5c84f8",
              transition: "transform 0.3s ease",
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <KeyboardArrowDown />
          </IconButton>
        </Box>

        <Collapse in={isExpanded} timeout={300}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.2, delay: isExpanded ? 0.1 : 0 }}
          >
            <Box
              sx={{
                px: 3,
                pb: 3,
                pt: 0,
                borderTop: "1px solid rgba(92, 132, 248, 0.1)",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
              }}
            >
              <Typography
                sx={{
                  color: "rgba(255, 255, 255, 0.9)",
                  lineHeight: 1.6,
                  fontSize: "0.95rem",
                  pl: 6.5, // Align with question text
                }}
              >
                {answer}
              </Typography>
            </Box>
          </motion.div>
        </Collapse>
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
            Frequently Asked Questions
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
            Everything you need to know about our AI-powered flashcard generator
          </Typography>
        </Box>
      </motion.div>

      <Box
        sx={{
          maxWidth: 800,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          position: "relative",
          zIndex: 1,
        }}
      >
        {FAQs.map((faq, index) => (
          <FaqItem key={index} {...faq} index={index} />
        ))}
      </Box>
    </Box>
  );
};

export default FaqSection;
