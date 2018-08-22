/**
 * Defines the React 16 Adapter for Enzyme.
 */
const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

enzyme.configure({ adapter: new Adapter() });


// Сделаем функции Enzyme доступными во всех файлах тестов без необходимости импорта importing
// import { shallow, render, mount } from 'enzyme';
// enzymeglobal.shallow = shallow;
// global.render = render;
// global.mount = mount;
// // Обрушим тест при любой ошибке
// console.error = message => {
//     throw new Error(message);
// };