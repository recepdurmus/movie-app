import React, { useState } from 'react'
import { PersonAddAltOutlined } from '@mui/icons-material'
import { Container, Grid, Typography, TextField, Avatar, Button} from '@mui/material'
import { Formik } from 'formik'
// import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from "../auth/firebase-config"




// const Schema = Yup.object().shape({
//     username: Yup.string()
//         .required('Display name is required')
//         .min(2, 'Too short')
//         .max(15, 'Must be 15 char or less'),
//     email: Yup.string().email('Invalid Email').required('Email is required'),
//     password: Yup.string()
//         .required('No password provided')
//         .min(8, 'Password is too short - should be 8 chars minimum')
//         .matches(/\d+/, 'Password must have a number')
//         .matches(/[a-z]+/, 'Password must have a lowercase')
//         .matches(/[A-Z]+/, 'Password must have a uppercase')
//         .matches(/[!?.@#$%^&*()-+]+/, 'Password must have a special char'),
//     confirm: Yup.string()
//         .required('No password provided')
//         .min(8, 'Password is too short - should be 8 chars minimum')
//         .oneOf([Yup.ref('password'), null], 'Passwords must match'),
// })

const Register = () => {
    const navigate = useNavigate()
    const [username, setusername] = useState()
    const [email, setemail] = useState()
    const [password, setpassword] = useState()
    const [confirm, setconfirm] = useState()

    const handleSubmit = async () => {
        const displayName = username
        try{
            
            let user = await createUserWithEmailAndPassword(auth, email, password)
            
            await updateProfile(auth.currentUser, {displayName : displayName})
            navigate('/')

        }catch(err){
            alert(err.message)
        }

    }
    
    // const initialValues = {
    //     username: '',
    //     email: '',
    //     password: '',
    //     confirm: ''
    // }


    return (
        <Container
            sx={{
                marginTop: '2rem',
                height: 'calc(95vh - 1rem)',
                bgcolor: 'background.paper',
                boxShadow: 1,
                borderRadius: 2,
                textAlign:'center',
                padding:'1rem'
            }}
            maxWidth='sm'
        >
            <Avatar
                sx={{
                    margin: '1rem auto',
                    bgcolor: 'primary.main',
                    }}
            >
                <PersonAddAltOutlined />
            </Avatar>

            <Typography sx={{ margin: '1rem' }} variant='h4'>
                Register
            </Typography>
            <Formik
                // initialValues={initialValues}
                onSubmit={handleSubmit}
                // validationSchema={Schema}
            >{({
                values,
                handleSubmit,
                touched, 
                errors,
                handleBlur

            }) => (
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField 
                                fullWidth
                                name='username' 
                                label="User Name" 
                                variant="outlined"
                                // value={values.username}
                                onChange={(e) => setusername(e.target.value)}
                                onBlur={handleBlur}
                                helperText={touched.usernamee && errors.usernamee}
                                error={touched.usernamee && Boolean(errors.usernamee)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                fullWidth 
                                name='email' 
                                label="Email" 
                                variant="outlined"
                                // value={values.emaile}
                                onChange={(e) => setemail(e.target.value)}
                                onBlur={handleBlur}
                                helperText={touched.emaile && errors.emaile}
                                error={touched.emaile && Boolean(errors.emaile)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                fullWidth
                                type='password' 
                                name='password' 
                                label="Password" 
                                variant="outlined"
                                // value={values.passworde}
                                onChange={(e) => setpassword(e.target.value)}
                                onBlur={handleBlur}
                                helperText={touched.passworde && errors.passworde}
                                error={touched.passworde && Boolean(errors.passworde)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                fullWidth
                                type='password' 
                                name='confirm' 
                                label="Confirm" 
                                variant="outlined"
                                // value={values.confirme}
                                onChange={(e) => setconfirm(e.target.value)}
                                onBlur={handleBlur}
                                helperText={touched.confirme && errors.confirme}
                                error={touched.confirme && Boolean(errors.confirme)} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button 
                                fullWidth 
                                item 
                                variant="contained"
                                type='submit'
                            >
                                Register
                            </Button>
                        </Grid>
                    </Grid>
                </form>)}
            </Formik>
        </Container>
    )
}

export default Register
