import * as React from 'react';
import { ChangeEvent, Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { classNamesImage } from 'src/renderer/component/Tutorial/steps/image';

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
      <FormControl>
        <InputLabel htmlFor='search'>Search</InputLabel>
        <Input
          id='search'
          type={'text'}
          value={this.state.searchWord}
          onChange={this.onChangeSearchWord}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label='Toggle password visibility'
                onClick={this.onSearch}
              >
                <SearchIcon/>
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    );
  }
}
