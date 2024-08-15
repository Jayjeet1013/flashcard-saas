import { Box, Grid, Typography, Divider } from '@mui/material';
import { featureDescriptions } from './featureDescriptions';

const FeatureGridItem = ({ title, description, divider }) => {
    return (
        <Grid item xs={12} md={4} sx={{ display: "flex", textAlign: "center" }}>
            <Box
            sx={{
                p: 3, 
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                minHeight: 200,
            }}
            >
            <Typography variant="h6">{title}</Typography>
            <Typography>{description}</Typography>
            </Box>
            {divider ? <Divider orientation="vertical" flexItem/> : <div></div>}
        </Grid>
    )
}

const FeatureGrid = () => {
    return (
        <Box>
            <Typography variant="h4">Features</Typography>
            <Grid container>
                {featureDescriptions.map(feature => (
                    <FeatureGridItem key={feature.title} {...feature}/>
                ))}
            </Grid>
        </Box>
    );
}

export default FeatureGrid;