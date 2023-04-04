import { Button, Card, CardContent, CardMedia, Container, Grid, ListItem, ListItemText, Rating, Tab, Tabs, TextField, Typography, useTheme, } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { useSelector } from 'react-redux';
import { getSubtotal } from '../utils';
import { useAuth } from '../firebase/Auth';


function UserInfo(){
  const address = null;
  return (
    <Box component="form" >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
            <TextField disabled defaultValue={address?.firstName ?? ""} required id="firstname" name="firstName" label="First Name" fullWidth autoComplete='given-name' variant='standard'></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField disabled defaultValue={address?.lastName ?? ""} required id="lastname" name="lastName" label="Last Name" fullWidth autoComplete='family-name' variant='standard'></TextField>
        </Grid>
        <Grid item xs={12}>
            <TextField disabled defaultValue={address?.address1 ?? ""} required id="address1" name="address1" label="Address Line 1" fullWidth variant='standard'></TextField>
        </Grid>
        <Grid item xs={12}>
            <TextField disabled defaultValue={address?.address2 ?? ""} required id="address2" name="address2" label="Address Line 2" fullWidth variant='standard'></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField disabled defaultValue={address?.city ?? ""} required id="city" name="city" label="City" fullWidth variant='standard'></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField disabled defaultValue={address?.country ?? ""} required id="country" name="country" label="Country" fullWidth variant='standard'></TextField>
        </Grid>
        <Grid item xs={12}>
            <TextField disabled defaultValue={address?.zipCode ?? ""} required id="zipCode" name="zipCode" label="Zip Code/Postal Code" fullWidth variant='standard'></TextField>
        </Grid>
      </Grid>
    </Box>
  )
}

function OrderList(){
  const bought = useSelector((state) => state.bought.value);
  const theme =  useTheme();
  return (
    <Grid item md={8} sm={12} sx={{display:"flex",justifyContent:"center",}}>
        <Card sx={{p:2,width:"100%"}}>
        <Typography variant="h5" component="h2" gutterBottom sx={{borderBottom:`1px Solid ${theme.palette.text.disabled}`}}>Your Orders</Typography>
          {bought.length ? bought.map(({product,quantity,date})=>(<ListItem key={product.title} sx={{py:1,px:0}}>
                  <ListItemText sx={{"& .MuiListItemText-primary":{
                    fontWeight: 500,
                  },
                  "& .MuiListItemText-secondary": {
                    fontSize: theme.spacing(2),
                  }
                  }} primary={product.title} secondary={`Qty: ${quantity}, Date:${date}`}></ListItemText>
                  <Typography variant="body2">{getSubtotal([{product,quantity}])?.toFixed(2)}</Typography>
                </ListItem>
                )): <Typography>No Order</Typography>}
        </Card>
    </Grid>
  )
}

export default function Profile() {
    const bought = useSelector((state) => state.bought.value);
    const theme =  useTheme();
    const logoImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIMAAACDCAMAAACZQ1hUAAAAbFBMVEX///8rLzIcISWGiIkiJyonKy4AAAAXHSFaXF4IERdER0kkKCy5ursTGh7k5eWhoqPt7e0ACA+ys7RUVlj29vaZmptzdXYPFhuAgYPKysusrK49QUMAAAbX19dhY2TP0NBLTlAzNzqPkZJqbG554O45AAADfElEQVR4nO2a2XajMAxAY2MDZjFLKAQSQiD//48DTTtZCgQZmZkz4/vYPPQeW5KF7N3OYDAYDAaDYUPipuosy+qqJv4zAsHheDoJh1LqiNPpeAi2FqgtEVJO7nAaCqve0EDm3CE/cXgut1KIGB0xGKAs2sRAemLCYEB4GyxFSdmMAiGMlroVgqdIHINTzRmSFm8MBopUp0JpL1AgxNa4HZK824iv7SD6AvM8lZOv0LMuhWguKZ8RmuqEXLoKnyuhZzcskIOlQyFOAAqEJDqO827smJrG6fAVMm9ZXn7DvQzdoVmeFDdEg+5gwbai3wz8qLzAtqLfjAu2QtwCFQhpsTOjme8axmDYAREsObSfKbD7iEWNw4sDdhsRKThgn1tRCHYI/0WHvyEmA4V1wHaofbCDj/35GbfgWo1eJ3d76EL4e2yF3Qc0IMIPdIca7IA/jcj2wD5qj99HQas1eqUeyCCtfd/ca1iGPioh3ZyDH5ED2cIv3gFOtCxD30MAvje1jSAOS/MzPOhS2MWXZV0lu2ic28pkSUjwROtsrqbvjw2fap7X1u27MkFb7SNj6c1L0C2GpFl+mg4Kfso1FYYXSm8iNHniaR/SfpNFx/BnbPrhMdpmEW7EqSccdl8NzhzhpZvf5sgqPwo7EUIktjjm1WZXF89kcV2maVrW8ZZ7YPhNbfnW1N7L/jf9F2vN1Xe4Q67pTw2ZXkn/G7viD+Se/s25uFVqJti5C+4eMujO/d9u1To868uRzLIf+gefJrbNPNd1PWbbyeOByuyDpkQpyUhTy5nPRgo3JTqKdtYVkI8cXnToS5G54FmxiywhBXw+SQvU0Gw4dPow4PuIWdoQ+BTmU4KgSdShyioMcAdpO2JHVWG4eEbpKbI9PBzvMJTsOMAnk48UCJ991TqFXqJaqxDDZ6OvhGtDIodNX8ag+TqFhY8N5ln3FCED36SNwS9rciNdHw0D4ZqpjKdWo1/xPXWFAHqvOoWjfo3grqmQjzDldyESIylu2KpnF2goOo/qyBQ6JZ+DKx5dcu1J8YhiX1dBu9g5ErXMuGJlxQC7qihAH5/Mo/Y0RbaICoS0KgFR4pwV3zgqh6fC7fIcSjfPiBVqQKlKgR8CvXFQeSaE0MU9otTRnTHLg+LRiXZwfzm4xsE4rHTYFxSTQuVJxoeFi54LcIPBYDAYDP8nvwCqqzMw6CLfPAAAAABJRU5ErkJggg==";
    console.log(theme);
    const {user} = useAuth();


  return (
    <>
    <Container sx={{py:4, display:"flex",justifyContent:"space-evenly"}}>
    <Grid container spacing={2}>
        <Grid item md={4} sm={12} sx={{}}>
          <Card sx={{p:2,display:"flex",flexDirection:"column",alignItems: "center",gap:"1px",justifyContent:"space-evenly"}}>
            <CardMedia component="img" image={logoImg} alt={"userlogo"} sx={{width:theme.spacing(15), height:theme.spacing(15),objectFit:"contain",border:`2px Solid ${theme.palette.text.disabled}`,borderRadius:"50%",pt:theme.spacing()}}/>
            <Typography>{user?.displayName.toUpperCase()}</Typography>
            <UserInfo/>
            <Button sx={{mt:3,ml:1}}  variant='contained'>Edit</Button>
          </Card>
          
            
        </Grid>
        {
          bought.length > 0 && <OrderList/>

        }
        {/* <Grid item lg={8} md={12} sx={{display:"flex",justifyContent:"center",}}>
            <Card sx={{px:2,width:"100%"}}>
              {bought.length ? bought.map(({product,quantity,date})=>(<ListItem key={product.title} sx={{py:1,px:0}}>
                      <ListItemText sx={{"& .MuiListItemText-primary":{
                        fontWeight: 500,
                      },
                      "& .MuiListItemText-secondary": {
                        fontSize: theme.spacing(2),
                      }
                      }} primary={product.title} secondary={`Qty: ${quantity}, Date:${date}`}></ListItemText>
                      <Typography variant="body2">{getSubtotal([{product,quantity}])?.toFixed(2)}</Typography>
                    </ListItem>
                    )): <Typography>No Orders</Typography>}
            </Card>
        </Grid> */}

    </Grid>

</Container>
</>
  )
}
