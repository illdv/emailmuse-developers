import * as React from 'react';
import {mount, shallow} from 'enzyme';
import { ImageLibrary2 as ImageLibrary} from '../ImageLibrary2';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import {bindActionCreators} from 'redux';
import {deleteImagesRequest, getImagesRequest, updateImageRequest, uploadImagesRequest} from '../store/actions';

describe('>>>ImageLibrary', () => {
    const initialState = {
        items: [],
        pagination: {
            current_page: 1,
            last_page: 3,
            per_page: 15,
            total: 39,
        },
         actions: jest.fn(),
    };
    let store, props, imageLibrary;

    // //First way
    // const mockStore = configureStore();
    // beforeEach(() => {
    //     store = mockStore(initialState);
    //     imageLibrary = mount( <Provider store={store}><ImageLibrary2 /> </Provider> );
    // });

    // Second way
    beforeEach(() => {
        props = initialState;
        imageLibrary = shallow( <ImageLibrary {...props} > 0 </ImageLibrary> );
    });

    it('render ImageLibrary component', () => {
        expect(imageLibrary).toMatchSnapshot();
    });
});
