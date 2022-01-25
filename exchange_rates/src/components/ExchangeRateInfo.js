import React from 'react';
import {Grid, Paper, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import BCH from '../images/BCH.png';
import BNB from '../images/BNB.png';
import BTC from '../images/BTC.png';
import DOT from '../images/DOT.png';
import EOS from '../images/EOS.png';
import ETH from '../images/ETH.png';
import LINK from '../images/LINK.png';
import LTC from '../images/LTC.png';
import XLM from '../images/XLM.png';
import XRP from '../images/XRP.png';
import YFI from '../images/YFI.png';
import sats from '../images/sats.png';
import μBTC from '../images/μBTC.png';
import currency from '../images/currency.jpeg';
import XAG from '../images/XAG.jpeg';
import XAU from '../images/XAU.jpeg';


const useStyles = makeStyles((theme) => ({
  paper: {
    color: 'black',
    borderRadius: 8,
  },
  avatar: {
    margin: 'auto',
    textAlign: 'center',
  },
  image: {
    width: '50px',
    verticalAlign: 'middle',
  },
  content: {
    padding: '5px 0',
  },
  text: {
    fontSize: 14,
    textTransform: 'uppercase',
  }
}));

export default function ExchangeRateInfo(props) {

  const classes = useStyles();

    return (
      <Paper className={classes.paper} style={{ margin: "20px" }}>
        <Grid container xs={12}>
          <Grid item xs={4} className={classes.avatar}>
            {
                props.exchangeRate.type === 'fiat'? 
                <img
                src={currency}
                alt={props.exchangeRate.unit}
                className={classes.image}
                />
                :
                <img
                src={determineLogo(props.exchangeRate.unit)}
                alt={props.exchangeRate.unit}
                className={classes.image}
                />
            }
          </Grid>
          <Grid item xs={8} className={classes.content}>
            <Typography style={{ margin: "5px" }} gutterBottom component="div">
              <b>{props.exchangeRate.name}</b> <Typography variant="caption">{props.exchangeRate.unit}</Typography>
            </Typography>
            <Typography style={{ margin: "5px" }}  gutterBottom component="div">
              {props.exchangeRate.value} 
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    );
}

function determineLogo(symbol) {
  switch (symbol) {
    case 'BCH':
      return BCH;
    case 'BNB':
      return BNB;
    case 'BTC':
      return BTC;
    case 'DOT':
      return DOT;
    case 'EOS':
      return EOS;
    case 'ETH':
      return ETH;
    case 'LINK':
      return LINK;
    case 'LTC':
      return LTC;
    case 'sats':
      return sats;
    case 'XLM':
      return XLM;
    case 'XRP':
      return XRP;
    case 'YFI':
      return YFI;
    case 'μBTC':
        return μBTC;
    case 'XAG':
        return XAG;
    case 'XAU':
        return XAU;
    default:
      break;
  }
}
