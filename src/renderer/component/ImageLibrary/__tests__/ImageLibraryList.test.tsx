import * as React from 'react';
import {compose} from 'redux';
import {ImageLibraryList} from '../ImageLibraryList';
import {mount, shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import {IImageLibraryItem} from '../store/models';

// jest.mock('../../../src/components/ui/Color', () => {
//     ({rating, onRate = f => f, onRemove = f => f}) => {}
// });

describe('<ImageLibraryList /> UI Component', () => {
    const image0: IImageLibraryItem = {
        id: 89,
        url: 'https://infocron.s3.us-east-2.amazonaws.com/user-5/nc6DTVcBCpU3Vnew8QuoZkklwvN2uWukO8fPfrSg.jpeg',
        thumb_url: 'https://infocron.s3.us-east-2.amazonaws.com/' +
        'user-5/nc6DTVcBCpU3Vnew8QuoZkklwvN2uWukO8fPfrSg_thumb450.jpeg',
        name: 'tesla-cat',
    };
    const image1: IImageLibraryItem = {
        id: 90,
        url: 'https://infocron.s3.us-east-2.amazonaws.com/user-5/nc6DTVcBCpU3Vnew8QuoZkklwvN2uWukO8fPfrSg.jpeg',
        thumb_url: 'https://infocron.s3.us-east-2.amazonaws.com/' +
        'user-5/nc6DTVcBCpU3Vnew8QuoZkklwvN2uWukO8fPfrSg_thumb450.jpeg',
        name: 'tesla-cat',
    };
    const image2: IImageLibraryItem = {
        id: 91,
        url: 'https://infocron.s3.us-east-2.amazonaws.com/user-5/nc6DTVcBCpU3Vnew8QuoZkklwvN2uWukO8fPfrSg.jpeg',
        thumb_url: 'https://infocron.s3.us-east-2.amazonaws.com/' +
        'user-5/nc6DTVcBCpU3Vnew8QuoZkklwvN2uWukO8fPfrSg_thumb450.jpeg',
        name: 'tesla-cat',
    };
    const imageArray: IImageLibraryItem[] = [image0, image1, image2];
    const selectImg = jest.fn();
    const deleteImg = jest.fn();
    let props = {
        items: [...imageArray],
        onDelete: deleteImg,
        onSelect: selectImg,
    };
    const imageList = mount(<ImageLibraryList {...props} />);

    describe('Rendering UI', () => {
        it('Renders Correctly', () => {
            compose(expect, shallowToJson, shallow)(<ImageLibraryList {...props} />).toMatchSnapshot();
        });

        it('Defaults Properties correctly', () => {
            props = {
                items: [],
                onDelete: jest.fn(),
                onSelect: jest.fn(),
            };
            expect(shallow(<ImageLibraryList {...props} />));
        });

        describe('Selecting a img', () => {
            imageList.find('img')
                .first()
                .simulate('click');

            it('must dispatch onSelect', () => {
                expect(selectImg).toBeCalled();
            });

            it('onSelect take image', () => {
                expect(selectImg).toBeCalledWith(image0);
            });

        });

        describe('Clicking delete button', () => {
            imageList
                .find('IconButton')
                .first()
                .simulate('click');

            it('must dispatch onDelete', () => {
                expect(deleteImg).toBeCalled();
            });

            it('onDelete take image', () => {
                expect(deleteImg).toBeCalledWith(image0);
            });

        });
    });
});
