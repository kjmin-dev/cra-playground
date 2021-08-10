import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, ThemeProvider, createTheme } from '@material-ui/core/styles';
import { AppBar, BottomNavigation, BottomNavigationAction, Toolbar, IconButton } from '@material-ui/core';
import LightBlue from '@material-ui/core/colors/lightBlue'
import { greetings } from '@LIB/hello';

import MenuIcon from '@material-ui/icons/Menu';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: '300px'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    sideNavigation: {
        display: 'none'
    },
    bottomNavigation: {
        position: "fixed",
        bottom: 0,
        width: "100%",
    },
    '@media (min-width: 768px)': {
        bottomNavigation: {
            display: 'none'
        },
        sideNavigation: {
            display: 'block'
        }
    }
}));

const theme = createTheme({
    palette: {
        primary: {
            main: LightBlue[500]
        }
    }
});
function App() {
    const [value, setValue] = useState(0);
    const classes = useStyles();
    return (
        <ThemeProvider theme={theme}>
            <div className={clsx('App', classes.root)}>
                <AppBar
                    position="fixed"
                    className={classes.appBar}
                >
                    <Toolbar>
                        <IconButton color="inherit" className={clsx(classes.menuButton, classes.sideNavigation)}>
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <header className="App-header">
                    <p>
                        {greetings('World')}
                    </p>
                    <p>
                        Edit <code>src/App.tsx</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
                <BottomNavigation
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    showLabels
                    className={classes.bottomNavigation}
                >
                    <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
                    <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
                    <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
                </BottomNavigation>
            </div>
        </ThemeProvider>
    );
}

export default App;
