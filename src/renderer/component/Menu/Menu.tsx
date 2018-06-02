import * as React from 'react';
import { ReactElement } from 'react';
import { connect, Dispatch } from 'react-redux';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import {
  Button,
  Divider,
  Grid, List,
  ListItem,
  ListItemIcon,
  Paper, Slide,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core/';
import { Collections, Drafts, SupervisorAccount, ViewCompact } from '@material-ui/icons';
import { bindActionCreators } from 'redux';
import { FluxDrawerMenu, MenuItemType } from 'src/renderer/component/Menu/flux/action';
import { IStyle } from 'type/materialUI';
import { logoutAction } from 'src/renderer/component/Profile/Authorisation/flux/module';

const createMenuSchema = (): IItem[] => {
  return [
    { title: 'My account', icon: <SupervisorAccount/>, type: MenuItemType.ACCOUNT },
    { title: 'Templates', icon: <Drafts/>, type: MenuItemType.TEMPLATES },
    { title: 'Image library', icon: <Collections/>, type: MenuItemType.IMAGE_LIBRARY },
    { title: 'Snippets', icon: <ViewCompact/>, type: MenuItemType.SNIPPETS },
  ];
};

const styles: IStyle = theme => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  item: {
    paddingLeft: 0,
  },
});

function Item(props: { title: string, icon, className?, onClick?: any }) {
  const { className, icon, title, onClick } = props;
  return (
    <ListItem button className={className} onClick={onClick}>
      <ListItemIcon>
        {icon}
      </ListItemIcon>
      <Typography variant='subheading' noWrap>{title}</Typography>
    </ListItem>
  );
}

export namespace MenuSpace {
  export interface IProps {
    actions: FluxDrawerMenu.IActions;
    logout: () => void;
  }

  export interface IState {
    treeData: any;
    searchWord: string;
    searchFocusIndex: number;
    isOpen: boolean;
  }
}

interface IItem {
  title: string;
  icon: ReactElement<any>;
  className?: string;
  type: MenuItemType;
}

const mapStateToProps = (state: IGlobalState) => ({
  menu: state.drawerMenu,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  actions: bindActionCreators({
    ...FluxDrawerMenu.Actions,
  }, dispatch),
  logout: () => {
    dispatch(logoutAction());
  },
});

@(connect(mapStateToProps, mapDispatchToProps))
class Menu extends React.Component<MenuSpace.IProps & WithStyles<any>, MenuSpace.IState> {
  selectItem = (type: MenuItemType) => () => {
    this.props.actions.selectMenuItem(type);
  }

  render() {
    const { classes, logout } = this.props;
    const menuSchema          = createMenuSchema();

    const toItem = (items: IItem[]) => {
      return items.map(item => (
        <div key={item.title}>
          <Item
            title={item.title}
            icon={item.icon}
            className={item.className}
            onClick={this.selectItem(item.type)}
          />
          <Divider/>
        </div>
      ));
    };

    return (
      <Slide direction='right' in mountOnEnter unmountOnExit>
        <Paper elevation={4} className={classes.root}>
          <List component='nav'>
            {toItem(menuSchema)}
          </List>
          <Grid
            style={{ height: '100%', marginBottom: 10 }}
            container
            direction={'column'}
            justify={'flex-end'}
            alignItems={'center'}
          >
            <Grid item>
              <Button variant='raised' color='primary' onClick={logout}>
                Logout
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Slide>
    );
  }

  static defaultProps = {
    googleLogin: {},
  };
}

export default withStyles(styles)(Menu as any);
