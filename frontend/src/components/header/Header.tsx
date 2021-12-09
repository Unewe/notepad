import React, {MouseEvent, useCallback} from "react";
import {Tab, Tabs} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {makeStyles} from "@mui/styles";

const routes: Array<{ label: string, href: string }> = [
  {label: "Main", href: "/"},
  {label: "Users", href: "/users"},
  {label: "About", href: "/about"}
];

const useStyles = makeStyles({
  root: {
    backgroundColor: 'rgba(10, 25, 41, .2)',
  },
});

const LinkTab: React.FC<{ label: string, href: string }> = ({children, ...props}): React.ReactElement => {
  return (
    <Tab
      component="a"
      onClick={(event: MouseEvent): void => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

export const Header: React.FC = (): React.ReactElement => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const handleChange = useCallback((event: React.SyntheticEvent, index: number) => {
    navigate(routes[index]?.href);
  }, [navigate]);
  return (
    <Tabs className={classes.root}
          value={routes.findIndex(value => value.href === location.pathname)}
          onChange={handleChange}
          aria-label="Навигация по сайту.">
      {routes.map((route, index) => <LinkTab key={index} {...route}/>)}
    </Tabs>
  )
}