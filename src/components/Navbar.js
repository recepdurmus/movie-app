import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
import {auth} from '../auth/firebase-config'

const Navbar = () => {
    const navigate = useNavigate();

    const {currentUser} = useContext(AuthContext);

    const signOutFunc = async () => {
      await signOut(auth)
    }

    return (
        <Box sx={{ flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ marginLeft: 5 }}
                        onClick={() => navigate("/")}
                    > Papbu | Movie</IconButton>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}></Typography>
                    {currentUser?( <Button color="inherit">{currentUser.displayName}</Button>
                        ):(
                        <Button onClick={() => navigate("/login")} color="inherit">Login</Button>
                    )}
                    {currentUser? (<Button onClick={() => signOutFunc()} color="inherit">Logout</Button>):(
                        <Button onClick={() => navigate("/register")} color="inherit">Register</Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar

