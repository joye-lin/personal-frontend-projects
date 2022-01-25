import React, { useState,} from 'react';
import { Container } from '@mui/material';
import Tabs from './components/Tabs';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import SearchFieldContext from './contexts/SearchFieldContext';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  export default function ExchangeRates() {
    const [searchField, setSearchField] = useState(' ');
    const [fieldText, setFieldText] = useState(' ');

    function handleChange(e) {
        setFieldText(e.target.value);
    };

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            setSearchField(fieldText);
        }
    }

    return (
        <Container maxWidth="xl" style={{ backgroundColor: "#FAFAFA", padding: "0px", paddingBottom: '200px' }}>
            <Box sx={{ flexGrow: 1, marginBottom: "20px" }}>
                <AppBar position="static" color="">
                    <Toolbar>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }}}
                        >
                            ExchangeRates
                        </Typography>
                        <Search>
                            <SearchIconWrapper>
                            <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                onChange = {handleChange}
                                onKeyDown={handleKeyDown}
                            />
                        </Search>
                    </Toolbar>
                </AppBar>
            </Box>
            <div style={{ margin: '30px' }}>
                <SearchFieldContext.Provider value={searchField}>
                    <Tabs/>
                </SearchFieldContext.Provider>
            </div>
        </Container>
    );
};