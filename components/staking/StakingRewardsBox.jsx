import { Box, Button, CircularProgress, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import theme from '@styles/theme';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';

const gridBox = {
  background: 'rgba(35, 35, 39, 0.7)',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  textAlign: 'center',
  p: 4,
  color: '#fff',
  borderRadius: 2,
  border: 1,
  borderColor: 'rgba(46,46,51,1)',
  width: '100%',
  minWidth: '240px',
  maxWidth: '380px',
};


const StakingRewardsBox = (props) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  const handleTooltipOpen = () => {
    setTooltipOpen(true);
  };


  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: { xs: 'center', md: 'flex-start' },
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: '700' }}>
          Your Holdings
        </Typography>
        
      </Box>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        
        <Box sx={gridBox}>
          <Typography>ErgoPad Staked</Typography>
          <Typography variant="h3" sx={{ mb: 0 }}>
            {props.loading ? (
              <CircularProgress sx={{ mt: 2, color: '#fff' }} />
            ) : props.totalStaked ? (
              props.totalStaked?.toLocaleString(navigator.language, { maximumFractionDigits: 2 })
            ) : (
              '-'
            )}
          </Typography>
          
          {/* <Typography>Rewards</Typography>
          <Typography variant="h3" sx={{ mb: 3 }}>
            -
          </Typography> */}
{/*           <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
              variant="contained"
              sx={{
                color: '#fff',
                fontSize: '1rem',
                py: '0.6rem',
                px: '1.2rem',
                textTransform: 'none',
                background: theme.palette.secondary.main,
                '&:hover': {
                  background: theme.palette.secondary.hover,
                  boxShadow: 'none',
                },
                '&:active': {
                  background: theme.palette.secondary.active,
                },
              }}
              onClick={() => {
                props.setTabValue(1)
                const element = document.getElementById('withdraw');
                if (element && element.scrollIntoView) {
                  element.scrollIntoView();
                }
              }}
            >
              Unstake
            </Button>
          </Box> */}
        </Box>
        
      </Box>
      <Box sx={{ p: 1 }} >
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end" sx={{ color: theme.palette.text.secondary }}>
          <Typography sx={{ textAlign: 'right' }}>Sum all addresses in wallet
          </Typography>
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <Tooltip 
              PopperProps={{ disablePortal: true }}
              onClose={handleTooltipClose}
              open={tooltipOpen}
              disableFocusListener
              disableHoverListener
              disableTouchListener 
              title="You can choose a main address when you connect a wallet. Toggle  to show the number of staked tokens in only the selected address, or to take the sum of all addresses in your connected wallet"
            >
              <IconButton aria-label="more info">
                <InfoIcon onClick={handleTooltipOpen} fontSize="small" sx={{ color: theme.palette.text.secondary }} />
              </IconButton>
            </Tooltip> 
          </ClickAwayListener>
          <Switch defaultChecked />
        </Stack>
      </Box>
    </>
  );
};

export default StakingRewardsBox;
