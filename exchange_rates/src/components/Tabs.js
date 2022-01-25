import React, { useState, useEffect, useContext  } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid } from '@material-ui/core';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import ExchangeRateInfo from './ExchangeRateInfo';
import Skeleton from './Skeleton';
import BarChart from './BarChart';
import APIError from '../images/API-Error.png';
import NoNetwork from '../images/No-Network.png';
import NoResult from '../images/No-Result.png';
import { makeStyles } from '@material-ui/core/styles';
import SearchFieldContext from '../contexts/SearchFieldContext';

const useStyles = makeStyles((theme) => ({
  imageAPI: {
    width: '450px',
    verticalAlign: 'middle',
  },
  imageNetwork: {
    width: '250px',
    verticalAlign: 'middle',
  },
  imageResult: {

  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const classes = useStyles();
  const searchField = useContext(SearchFieldContext);

  let resultOfSearch =[];
  const resultOfCrypto = [];
  const resultOfFiat = [];
  const resultOfCommodity = [];
  const [value, setValue] = React.useState(0);
  const [exchangeRates, setExchangeRates] = useState([]);
  const [httpStatusCode, setHttpStatusCode] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
      fetch("https://api.coingecko.com/api/v3/exchange_rates")
      .then(response => {
          if (response.ok) {
            setHttpStatusCode('ok');
            return response.json()
          }
          setHttpStatusCode('404');
          throw response;
      })
      .then(data => {
          setExchangeRates(data);
      })
      .catch(error => {
          console.error("Error fetching data: ",  error);
          setError(error);
      })
      .finally(() => {
          setLoading(false);
      })
  }, []);
  
  if (loading) return <Skeleton/>;

  if (httpStatusCode === '404') return(
    <Grid container spacing={2}>
      <Grid item xs={12} style={{ display: 'inline-block', textAlign: 'center', marginTop: '40px' }}>
      <img
          src={APIError}
          alt={"API error"}
          className={classes.imageAPI}
        />
      </Grid>
      <Grid item xs={3}/>
      <Grid item xs={6} >
      <Stack sx={{ marginTop: '-70px'}} spacing={2}>
        <Alert variant="filled" severity="error" style={{ backgroundColor: '#EF5350' }}>
          Failed to fetch API — check it out!
        </Alert>
      </Stack>
      </Grid>
    </Grid>
  );

  if (error) return (
    <Grid container spacing={2}>
      <Grid item xs={12} style={{ display: 'inline-block', textAlign: 'center', marginTop: '40px' }}>
      <img
          src={NoNetwork}
          alt={"No Network Connectivity"}
          className={classes.imageNetwork}
        />
      </Grid>
      <Grid item xs={3}/>
      <Grid item xs={6} >
      <Stack spacing={2}>
        <Alert variant="filled" severity="error" style={{ backgroundColor: '#EF5350' }}>
          Failed to connect network — check it out!
        </Alert>
      </Stack>
      </Grid>
    </Grid>
  );
  
    for (const [key, info] of Object.entries(exchangeRates.rates)) {
      if (info.type === 'crypto') {
        resultOfCrypto.push(info);
      } else if (info.type === 'fiat') {
        resultOfFiat.push(info);
      } else {
        resultOfCommodity.push(info);
      }
    }

    function pendingS (result) {
      if (result.length === 1) {
        return result.length + " result found of {searchField} : )";
      }
      return result.length + " results found of {searchField} : )";
    }

    if (searchField.replace(/\s/g, '').length > 1) {
      let resultOfFielter = Object.fromEntries(Object.entries(exchangeRates.rates).filter(([k,v]) => v.name.replace(/\s/g, '').toUpperCase().match(searchField.replace(/\s/g, '').toUpperCase()) || v.unit.replace(/\s/g, '').toUpperCase().match(searchField.replace(/\s/g, '').toUpperCase())));
      for (const [key, info] of Object.entries(resultOfFielter)) {
        resultOfSearch.push(info);
      }
      console.log(resultOfSearch.length);
      if (resultOfSearch.length > 0) {
        return (
          <Grid container columns={{ xs: 4, sm: 8, lg: 12 }}>
            <Grid item xs={3}/>
            <Grid item xs={6} >
            <Stack spacing={2}>
              <Alert variant="filled" severity="success" style={{ backgroundColor: '#C8E6C9', margin: '30px' }}>
                {pendingS(resultOfSearch)}
              </Alert>
            </Stack>
            </Grid>
            {
              resultOfSearch.map((search) => (
                <Grid item xs={12} sm={6} md={4} lg={4} key={search.unit}>
                  <ExchangeRateInfo exchangeRate = {search}/>
                </Grid>
            ))}
          </Grid>
        );
      } else {
        return (
          <Grid container spacing={2} style={{ height: '100%' }}>
          <Grid item xs={12} style={{ display: 'inline-block', textAlign: 'center', marginTop: '40px' }}>
          <img
              src={NoResult}
              alt={"No Result Found"}
              className={classes.imageResult}
            />
          </Grid>
          <Grid item xs={3}/>
          <Grid item xs={6} >
          <Stack spacing={2}>
            <Alert variant="filled" severity="info" style={{ backgroundColor: '#40C4FF' }}>
              Sorry! No result found of "{searchField}" : (
            </Alert>
          </Stack>
          </Grid>
        </Grid>
        );
      }
    };
  
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="Category">
          <Tab label="Crypto" {...a11yProps(0)} />
          <Tab label="Fiat" {...a11yProps(1)} />
          <Tab label="Commodity" {...a11yProps(2)} />
        </Tabs>
      </Box>
        <TabPanel value={value} index={0}>
          <BarChart data={resultOfCrypto} title={"Crypto Exchange Rates"}/>
          <Grid container columns={{ xs: 4, sm: 8, lg: 12 }}>
            {
              resultOfCrypto.map((crypto) => (
                <Grid item xs={12} sm={6} md={4} lg={4} key={crypto.unit}>
                  <ExchangeRateInfo exchangeRate = {crypto}/>
                </Grid>
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <BarChart data={resultOfFiat} title={"Fiat Exchange Rates"}/>
          <Grid container columns={{ xs: 4, sm: 8, lg: 12 }}>
            {
              resultOfFiat.map((fiat) => (
                <Grid item xs={12} sm={6} md={4} lg={4} key={fiat.unit}>
                  <ExchangeRateInfo exchangeRate = {fiat}/>
                </Grid>
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <BarChart data={resultOfCommodity} title={"Commodity Exchange Rates"}/>
          <Grid container columns={{ xs: 4, sm: 8, lg: 12 }}>
            {
              resultOfCommodity.map((commodity) => (
                <Grid item xs={12} sm={6} md={4} lg={4} key={commodity.unit}>
                  <ExchangeRateInfo exchangeRate = {commodity}/>
                </Grid>
            ))}
          </Grid>
        </TabPanel>
    </Box>
  );
}

