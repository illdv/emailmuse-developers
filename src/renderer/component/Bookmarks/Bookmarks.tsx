import { Component } from 'react';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import {
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  Paper,
  Typography,
  withStyles
} from '@material-ui/core/';
import { AddCircleOutline, Edit } from '@material-ui/icons';
import { IStyle } from 'type/materialUI';
import { Fab } from 'src/renderer/common/Fab';
import { bindActionCreators } from 'redux';
import { FluxBookmarks } from 'src/renderer/component/Bookmarks/flax/action';

const styles: IStyle = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  }
});

export namespace BookmarksSpace {
  export interface IState {

  }

  export interface IProps {
    classes?: any;
    bookmarks: FluxBookmarks.IState;
    actions: FluxBookmarks.IActions;
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  bookmarks: state.bookmarks
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  actions: bindActionCreators({
    ...FluxBookmarks.Actions,
  }, dispatch)
});

@(connect(mapStateToProps, mapDispatchToProps))
class Bookmarks extends Component<BookmarksSpace.IProps, BookmarksSpace.IState> {

  state = {};

  onOpenEditor = (bookmarkItem: FluxBookmarks.IModel) => () => {
    // this.props.actions.onOpenBookmarkEditor(bookmarkItem.id);
  }

  onCreate = () => () => {
    // this.props.actions.onOpenBookmarkEditor();
  }

  render() {
    const { classes, bookmarks } = this.props;

    const bookmarkList = bookmarks.bookmarks;
    // TODO: Paper and div have className = root, which is not cool, I guess
    return (
      <div>
        <Paper elevation={4} className={classes.root}>
          <div className={classes.root}>
            <List component="nav">
              {bookmarkList && bookmarkList.map((bookmarkItem, index) => (
                <div key={bookmarkItem.id}>
                  <ListItem button>
                    <Grid container spacing={24}>
                      <Grid item xs={4}>
                        <Typography gutterBottom noWrap>{bookmarkItem.title || '---'}</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography gutterBottom noWrap>{bookmarkItem.url || '---'}</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <ListItemSecondaryAction>
                          <IconButton
                            aria-label="Edit"
                            onClick={this.onOpenEditor(bookmarkItem)}
                          >
                            <Edit/>
                          </IconButton>
                        </ListItemSecondaryAction>
                      </Grid>
                    </Grid>
                  </ListItem>
                  {index !== bookmarkList.length - 1 && <Divider/>}
                </div>
              ))}
            </List>
          </div>
        </Paper>
        <div>
          <Fab className="fab fab_2" onClick={this.onCreate()} icon={<AddCircleOutline/>}/>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Bookmarks as any);
