import { Box, Grid, Typography, CircularProgress } from '@mui/material';
import theme from '@styles/theme';
import axios from 'axios';
import { useEffect, useState } from 'react';

const stakingItems = [
  {
    title: 'Number of Stakers',
    value: '-',
    background: theme.palette.primary.main,
  },
  {
    title: 'ErgoPad Tokens Staked',
    value: '-',
    background: theme.palette.secondary.main,
  },
  {
    title: 'Current APY',
    value: '-',
    background: theme.palette.tertiary.main,
  },
];

export const StakingItem = (item, md, ifSmall, loading = false) => {
  const extraStyles = {
    background: item.background,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    py: '1rem',
    color: '#fff',
    borderRadius: 2,
    textDecoration: 'none',
    '&:hover': {},
  };

  if (!ifSmall) {
    return (
    <Grid item md={md} xs={12} sx={{ maxWidth: '380px' }} key={item.title}>
      <Box sx={extraStyles}>
        <Typography variant="h5" sx={{ fontWeight: '700', my: 1 }}>
          {item.title}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: '800', my: 1 }}>
          {loading ? <CircularProgress sx={{ color: '#fff' }} /> : item.value}
        </Typography>
      </Box>
    </Grid>
    );
  }
  else {
    return (
      <Grid item xs={12} sx={{ maxWidth: '380px' }} key={item.title}>
        <Typography variant="p" sx={{ mb: 1, fontWeight: '700', fontSize: '0.9rem', color: theme.palette.text.primary }}>
          {item.title}: <Typography variant="span" sx={{ fontWeight: '500', color: theme.palette.text.secondary }}>{loading ? <CircularProgress sx={{ color: '#fff' }} /> : item.value}</Typography>
        </Typography>
      </Grid>
    )
  }
};

const StakingSummary = () => {
  const [status, setStatus] = useState(stakingItems);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getStatus = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${process.env.API_URL}/staking/status/`);
        const newState = JSON.parse(JSON.stringify(stakingItems));
        newState[0].value = res.data['Staking boxes']
          ? res.data['Staking boxes'].toLocaleString(navigator.language, { maximumFractionDigits: 0 })
          : '-';
        newState[1].value = res.data['Total amount staked']
          ? res.data['Total amount staked'].toLocaleString(navigator.language, { maximumFractionDigits: 0 })
          : '-';
        newState[2].value = res.data['APY']
          ? Math.round(res.data['APY'] * 100) / 100 + '%'
          : '-';
        setStatus(newState);
      } catch (e) {
        console.log('ERROR FECTHING:', e);
      }
      setLoading(false);
    };
    getStatus();
  }, []);

  return (
    <>
      <Grid
        container
        spacing={3}
        alignItems="stretch"
        justifyContent="center"
        sx={{ flexGrow: 1, mb: 3 }}
      >
        {status.map((item) => {
          return StakingItem(item, 4, loading);
        })}
      </Grid>
    </>
  );
};

export default StakingSummary;
