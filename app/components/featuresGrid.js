import { Box, Grid, Typography, Divider } from '@mui/material';
import { featureDescriptions } from '../../utils/featureDescriptions';

const FeatureGridItem = ({ title, description, divider }) => {
    return (
        <Grid item xs={12} md={4} sx={{ display: "flex", textAlign: "center", color: "white" }}>
            <Box
                sx={{
                    p: 3, 
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    minHeight: 200,
                    boxShadow: "0 4px 30px 0 rgba(59, 68, 89, .16)",
                    border: "1px solid #424242",
                    borderRadius: 5,
                    backgroundColor: "#202020"
                }}
            >
            <Typography variant="h6">{title}</Typography>
            <Divider color="5c84f8"/>
            <Typography>{description}</Typography>
            </Box>
        </Grid>
    )
}

const FeatureGrid = () => {
    return (
        <Box>
            <Typography variant="h4" color={"white"} sx={{ mb: 3, fontWeight: "bold" }}>Features</Typography>
            <Grid container spacing={2}>
                {featureDescriptions.map(feature => (
                    <FeatureGridItem key={feature.title} {...feature}/>
                ))}
            </Grid>
        </Box>
    );
}

export default FeatureGrid;