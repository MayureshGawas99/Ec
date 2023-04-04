import { Box, Button, Container, Paper, Step, StepLabel, Stepper, Typography } from '@mui/material'
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AddressForm from '../components/AddressForm';
import PaymentsForm from '../components/PaymentsForm';
import ReviewForm from '../components/ReviewForm';
import { addToBought } from '../feature/bought-slice';
import { clearCart } from '../feature/cart-slice';
import { clearCheckoutInformation } from '../feature/checkout-slice';
import { getTodayDate } from '../utils';


const steps = ["Shipping Address","Payment Details", "Review Order"];
function getStepContent(activeStep){
  switch(activeStep){
    case 0:
      return <AddressForm/>;
    case 1:
      return <PaymentsForm/>;
    case 2:
      return <ReviewForm/>;
    default:
      throw new Error("Unknown Step");
  }
}
export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  useEffect(() => {
    if (activeStep === steps.length){
      cart?.map(({product,quantity})=> dispatch(addToBought({product,quantity,date:getTodayDate()})));
      dispatch(clearCart());
      dispatch(clearCheckoutInformation());
    }
  }, [activeStep]);
  function handleNext(){
    setActiveStep(activeStep+1);
  }
  function handleBack(){
    setActiveStep(activeStep-1);
  }
  return (
    <Container component="section" maxWidth="lg" sx={{mb:4,}}>
      <Paper variant='outlined' sx={{my:{sx:3,md:6},p:{xs:2,md:3}}}>
        <Typography component="h1" variant ="h4" align="center">Checkout</Typography>
        <Stepper activeStep={activeStep} sx={{pt:3,pb:5,}}>
          {steps.map((label)=> (<Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>))}
        </Stepper>
        {activeStep === steps.length? 
        <>
          <Typography variant='h5' gutterBottom>Thank you for Your Order</Typography>
          <Typography >Your Order number is #1234</Typography>
          <Link to="/">Shop More</Link>
        </>:
        <>
          {getStepContent(activeStep)}
          <Box sx={{display:"flex",justifyContent:"flex-end"}}>
            {activeStep !==0 && <Button sx={{mt:3,ml:1}} onClick={handleBack} variant="contained">Back</Button>}
            <Button sx={{mt:3,ml:1}} onClick={handleNext} variant='contained'>{activeStep === steps.length-1? "Place Order":"Next"}</Button>
          </Box>
        </>}
      </Paper>

    </Container>
  )
}
