import { Box, Typography } from "@mui/material";
import { FAQs } from "../../utils/faqs";

const FaqItem = ({question, answer}) => {
    return (
        <Box 
            sx={{ 
            p: 5,
            border: "1px solid #424242",
            borderRadius: 5,
            backgroundColor: "#202020",
            boxShadow: "0 4px 30px 0 rgba(59, 68, 89, .16)",
            color: "white",
            display: "flex",
            flexDirection: "column",
            gap: 2
            }}
        >
            <Typography variant="h6" fontWeight="bold">{question}</Typography>
            <Typography>{answer}</Typography>
        </Box>
    )
}

const FaqSection = () => {
    return (
        <Box gap={3} sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h4" color="white" fontWeight="bold">FAQs</Typography>
            <Box
            sx={{
                display: "flex",
                flexDirection: "column"
            }}
            gap={3}
            >
            {FAQs.map(faq => <FaqItem key={faq.question} {...faq}/>)}
            </Box>
        </Box>
    )
}

export default FaqSection;