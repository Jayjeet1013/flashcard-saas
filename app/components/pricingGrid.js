'use client'
import { Box, Grid, Typography, Button, Divider } from '@mui/material';
import { pricingDescriptions } from '../../utils/pricingDescriptions';
import getStripe from '@/utils/get-stripe';

const PricingGridItem = ({ title, price, description, fee, divider }) =>  {
    const selectPlan = async () => {
        const checkoutSession = await fetch("/api/checkout_sessions", {
            method: "POST",
            headers: {
                "origin": "localhost:3000",
                "fee": fee,
            },
        });
        const checkoutSessionJson = await checkoutSession.json();

        if (checkoutSession.statusCode == 500) {
            console.error(checkoutSession.message);
            return
        }

        const stripe = await getStripe();
        const { error } = await stripe.redirectToCheckout({
            sessionId: checkoutSessionJson.id,
        })

        if (error) {
            console.warn(error.message);
        }
    }
    return (
        <Grid item xs={12} md={4} lg={4} sx={{ display: "flex", textAlign: "center", color: "white" }}>
            <Box
                sx={{
                    p: 3, 
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    minHeight: 250,
                    boxShadow: "0 4px 30px 0 rgba(59, 68, 89, .16)",
                    border: "1px solid #424242",
                    borderRadius: 5,
                    backgroundColor: "#202020"
                }}
            >
            <Typography variant="h6">{title}</Typography>
            <Divider color="#5c84f8"/>
            <Typography variant="body1">{price}</Typography>
            <Typography>{description}</Typography>
            <Button variant="contained" size='sm' onClick={selectPlan}>Choose {title}</Button>
            </Box>
        </Grid>
    )
}

const PricingGrid = () => {
    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 4, color: "white", fontWeight: "bold" }}>Pricing</Typography>
            <Grid container spacing={2}>
                {pricingDescriptions.map(pricing => (
                    <PricingGridItem key={pricing.title} fee={pricing.fee} {...pricing}/>
                ))}
            </Grid>
        </Box>
    );
}

export default PricingGrid;