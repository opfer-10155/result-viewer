import React, { forwardRef, SFC } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, Button, colors } from '@material-ui/core';
import { Theme } from '../../../theme';

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main
    }
  }
}));

type RouterProps = {
  to: string,
  activeClassName: string
}
const CustomRouterLink = forwardRef<HTMLDivElement, RouterProps>((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <NavLink {...props} />
  </div>
));

type Props = {
  className?: string,
  pages: {
    title: string,
    href: string,
    icon?: JSX.Element
  }[]
};

const SidebarNav: SFC<Props> = props => {
  const { pages, className, ...rest } = props;

  const classes = useStyles();

  return (
    <List
      {...rest}
      className={clsx(classes.root, className)}
    >
      {pages.map(page => (
        <ListItem
          className={classes.item}
          disableGutters
          key={page.title}
        >
          <Button
            activeClassName={classes.active}
            className={classes.button}
            component={CustomRouterLink}
            to={page.href}
          >
            <div className={classes.icon}>{page.icon}</div>
            {page.title}
          </Button>
        </ListItem>
      ))}
    </List>
  );
};


export default SidebarNav;
