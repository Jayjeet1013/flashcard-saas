import { Box, Grid, Typography, Button, Divider } from '@mui/material';
import { pricingDescriptions } from './pricingDescriptions';

const PricingGridItem = ({ title, price, description, divider }) => {
    return (
        <Grid item xs={12} md={4} sx={{ display: "flex", textAlign: "center" }}>
            <Box
            sx={{
                p: 3, 
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                minHeight: 250,
            }}
            >
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body1">{price}</Typography>
            <Typography>{description}</Typography>
            <Button variant="contained" size='sm'>Choose {title}</Button>
            </Box>
            {divider ? <Divider orientation='vertical' flexItem/> : <div></div>}
        </Grid>
    )
}

const PricingGrid = () => {
    return (
        <Box>
            <Typography variant="h4">Pricing</Typography>
            <Grid container>
                {pricingDescriptions.map(pricing => (
                    <PricingGridItem key={pricing.title} {...pricing}/>
                ))}
            </Grid>
        </Box>
    );
}

export default PricingGrid;