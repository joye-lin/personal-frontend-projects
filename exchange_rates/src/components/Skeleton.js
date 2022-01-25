import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import Skeleton from '@mui/material/Skeleton';
import { Grid } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

export default function loadingDisplay() {

  const n = 10;

  return (
    <div style={{ marginTop: '20px'}}>
       <Grid container spacing={2}>
         <Grid item xs={1} sm={2} md={3}/>
          <Grid item xs={10} sm={8} md={6} style={{ marginBottom: '30px'}}>
              <div>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ margin: 1 }}>
                    <Skeleton variant="rectangular">
                        <Avatar />
                        <Avatar />
                        <Avatar />
                        <Avatar />
                     </Skeleton>
                </Box>
                <Box sx={{ width: '100%' }}>
                    <Skeleton
                      animation="wave"
                      height={15}
                      style={{ marginBottom: 8 }}
                    />
                    <Skeleton
                      animation="wave"
                      height={15}
                      width="80%"
                      style={{ marginBottom: 8 }}
                    />
                    <Skeleton
                      animation="wave"
                      height={15}
                      width="60%"
                      style={{ marginBottom: 8 }}
                    />
                    <Skeleton
                      animation="wave"
                      height={15}
                      width="40%"
                      style={{ marginBottom: 8 }}
                    />
                    <Skeleton
                      animation="wave"
                      height={15}
                      width="20%"
                      style={{ marginBottom: 6 }}
                    />
                     <Skeleton
                      animation="wave"
                      height={15}
                      width="10%"
                      style={{ marginBottom: 8 }}
                    />
                    <Skeleton
                      animation="wave"
                      height={15}
                      width="5%"
                      style={{ marginBottom: 8 }}
                    />
                </Box>
              </Box>
            </div>
          </Grid>
       </Grid>
      <Grid container columns={{ xs: 4, sm: 8, lg: 12 }}>
      {[...Array(n)].map((item, index) => (
        <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
        <Card sx={{ maxWidth: 345, m: 2 }}>
          <CardHeader
            avatar={
                <Skeleton animation="wave" variant="circular" width={40} height={40} />
            }
            title={
                <Skeleton
                  animation="wave"
                  height={10}
                  width="80%"
                  style={{ marginBottom: 6 }}
                />
            }
            subheader={
                <Skeleton animation="wave" height={10} width="40%" />
            }
          />
        </Card>
        </Grid>
      ))}
      </Grid>
    </div>
  );
}

