import React, { useState } from 'react'
import { LoginOutlined } from '@mui/icons-material'
import { Container, Grid, Typography, TextField, Avatar, Button, Link} from '@mui/material'
import { Formik } from 'formik'
// import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../auth/firebase-config'





const Login = () => {
    const navigate = useNavigate()
    const [email, setemail] = useState()
    const [password, setpassword] = useState()

    // const Schema = Yup.object().shape({
    //     email: Yup.string().email('Invalid Email').required('Email is required'),
    //     password: Yup.string()
    //         .required('No password provided')
    //         .min(8, 'Password is too short - should be 8 chars minimum')
    //         .matches(/\d+/, 'Password must have a number')
    //         .matches(/[a-z]+/, 'Password must have a lowercase')
    //         .matches(/[A-Z]+/, 'Password must have a uppercase')
    //         .matches(/[!?.@#$%^&*()-+]+/, 'Password must have a special char')
    // })

    const handleSubmit = async () => {
        try {

            let user = await signInWithEmailAndPassword(auth, email, password)
            console.log(user)
            navigate('/')

        } catch (err) {
            alert(err.message)
        }
    }
    
    // const initialValues = {
    //     email: '',
    //     password: ''
    // }

    return (
        <Container
            sx={{
                marginTop: '2rem',
                height: 'calc(80vh - 1rem)',
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
                <LoginOutlined />
            </Avatar>

            <Typography sx={{ margin: '2rem'}} variant='h4'>
                Login
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
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            <TextField 
                                fullWidth 
                                name='email' 
                                label="Email" 
                                variant="outlined"
                                // value={values.email}
                                onChange={(e) => setemail(e.target.value)}
                                onBlur={handleBlur}
                                helperText={touched.email && errors.email}
                                error={touched.email && Boolean(errors.email)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                fullWidth
                                type='password' 
                                name='password' 
                                label="Password" 
                                variant="outlined"
                                // value={values.password}
                                onChange={(e) => setpassword(e.target.value)}
                                onBlur={handleBlur}
                                helperText={touched.password && errors.password}
                                error={touched.password && Boolean(errors.password)} />
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
            <p>
                Already have an account?
                <Link
                    sx={{
                        textDecoration: 'none',
                        fontWeight: '600',
                        paddingLeft: '0.5rem',
                        cursor: 'pointer'
                    }}
                    onClick={() => navigate('/register')}
                >
                Register.
                </Link>
            </p>
        </Container>
    )
}

export default Login
