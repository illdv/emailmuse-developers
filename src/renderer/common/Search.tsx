import { ChangeEvent, Component } from 'react';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { IconButton, TextField } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

export namespace SearchSpace {
  export interface IState {
    searchWord: string;
  }

  export interface IProps {
    search: (searchWorld: string) => void;
  }
}

export class Search extends Component<SearchSpace.IProps, SearchSpace.IState> {

  state: SearchSpace.IState = {
    searchWord: '',
  };

  onChangeSearchWord = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchWord: event.target.value });
    this.onSearch();
  }

  private timeoutId = null;

  onSearch = () => {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.props.search(this.state.searchWord);
    }, 500);
  }

  render() {
    return (
      <>
        <TextField
          label='Search'
          margin='normal'
          onChange={this.onChangeSearchWord}
        />
        <IconButton onClick={this.onSearch} color='primary'>
          <SearchIcon/>
        </IconButton>
      </>
    );
  }
}
