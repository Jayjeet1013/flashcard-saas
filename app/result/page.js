'use client'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import getStripe from '@/utils/get-stripe'
import { useSearchParams } from 'next/navigation'
import { CircularProgress, Typography, Container, Box } from '@mui/material'

const ResultPage = () => {
    const router  = useRouter()
    const searchParams = useSearchParams()
    const session_id = searchParams.get('session_id')
    const [session, setSession] = useState(true)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCheckoutSession = async () => {
            if (!session_id) return
            try {
                const response = await fetch(`/api/checkout_sessions?session_id=${session_id}`)
                const data = await response.json()
                if (response.ok) {
                    setSession(data)
                } else {
                    setError(data.error)
                }
            } catch (err) {
                setError('An error occurred while fetching the checkout session')
            }
            finally {
                setLoading(false)
            }
        }
        fetchCheckoutSession()
    }, [session_id])
    if (loading) {
        return(
            <Container maxwidth="100vw" sx={{textAlign: 'center', mt: 4}}>
                <CircularProgress />
                <Typography variant="h6">Loading...</Typography>
            </Container>
        )
    }
    if (error) {
        return(
            <Container maxwidth="100vw" sx={{textAlign: 'center', mt: 4}}>
                <Typography variant="h6">Error: {error}</Typography>
            </Container>
        )
    }
    return (
        <Container maxwidth="100vw" sx={{textAlign: 'center', mt: 4}}>
            {session.payment_status === 'paid' ? (
                <>
                    <Typography variant="h4">
                        Thank you for your purchase!
                    </Typography>
                    <Box sx={{mt:22}}>
                        <Typography variant="h6">Session ID: {session_id}</Typography>
                        <Typography variant="body1"> We have received your payment. You will receive an email with the order details shortly.</Typography>
                    </Box>
                </>
            ) : (
                <>
                    <Typography variant="h4">
                        Payment failed.
                    </Typography>
                    <Box sx={{mt:2}}>
                        <Typography variant="body1"> Your payment was not successful. Please try again. </Typography>
                    </Box>
                </>
            )}
        </Container>
)}


export default ResultPage;