import * as React from 'react';
import {mount, shallow} from 'enzyme';
import { ImageLibrary as ImageLibrary} from '../ImageLibrary';
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
        classes: {root: 'lib'},
        actions: { getImagesRequest, uploadImagesRequest, deleteImagesRequest, updateImageRequest },
    };
    let imageLibrary;

    describe('ImageLibrary initialization', () => {
         const props = {
            items: [],
            pagination: {
                current_page: 1,
                last_page: 3,
                per_page: 15,
                total: 40,
            },
            classes: {root: 'lib'},
            actions: { getImagesRequest, uploadImagesRequest, deleteImagesRequest, updateImageRequest },
        };

         beforeEach(() => {
            imageLibrary = shallow( <ImageLibrary {...props} />  );
         });

         it('render ImageLibrary component', () => {
            expect(imageLibrary).toMatchSnapshot();
         });
    });

    // //Second way
    // const mockStore = configureStore();
    // beforeEach(() => {
    //     let store = mockStore(initialState);
    //     imageLibrary = mount( <Provider store={store}><ImageLibrary2 /> </Provider> );
    // });

});
