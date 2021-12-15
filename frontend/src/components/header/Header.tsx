import React, { MouseEvent, useCallback } from 'react';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { observer } from 'mobx-react-lite';
import authentication from '../../store/authentication.store';
import UsersService from '../../services/users.service';

const routes: Array<{ label: string; href: string }> = [
  { label: 'Главная', href: '/' },
  { label: 'Заметки', href: '/notes' },
  { label: 'About', href: '/about' },
];

const useStyles = makeStyles({
  root: {
    display: 'flex',
    height: '48px',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#303030',
  },
});

const LinkTab: React.FC<{ label: string; href: string }> = ({
  children,
  ...props
}): React.ReactElement => {
  return (
    <Tab
      component='a'
      sx={{ color: 'white', '&.Mui-selected': { color: '#7fc9ff' } }}
      onClick={(event: MouseEvent): void => {
        event.preventDefault();
      }}
      {...props}
    />
  );
};

export const Header: React.FC = observer((): React.ReactElement => {
  const classes = useStyles();
  const [userAnchor, setUserAnchor] = React.useState<HTMLElement | undefined>(
    undefined
  );
  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = useCallback(
    (event: React.SyntheticEvent, index: number) => {
      navigate(routes[index]?.href);
    },
    [navigate]
  );

  const handleUserClick = (event: MouseEvent<HTMLElement>) => {
    setUserAnchor(userAnchor ? undefined : event.currentTarget);
  };

  const logout = () => {
    UsersService.logout();
    setUserAnchor(undefined);
  };

  return (
    <Box className={classes.root}>
      <Tabs
        sx={{ '.MuiTabs-indicator': { backgroundColor: '#7fc9ff' } }}
        value={routes.findIndex((value) => value.href === location.pathname)}
        onChange={handleChange}
        aria-label='Навигация по сайту.'
      >
        {routes.map((route, index) => (
          <LinkTab key={index} {...route} />
        ))}
      </Tabs>
      <Box sx={{ flexGrow: 0, float: 'right', mr: '15px' }}>
        {authentication.user ? (
          <Button onClick={handleUserClick} sx={{ color: 'white' }}>
            {authentication.user?.username}
          </Button>
        ) : (
          <Button
            onClick={() => {
              authentication.authModal = true;
            }}
            sx={{ color: 'white' }}
          >
            Войти
          </Button>
        )}
        <Menu
          sx={{ mt: '30px' }}
          id='menu-appbar'
          anchorEl={userAnchor}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(userAnchor)}
          onClose={() => setUserAnchor(undefined)}
        >
          <MenuItem onClick={logout}>
            <Typography textAlign='center'>Выйти</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
});
