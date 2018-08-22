module.exports = {
    'roots': ['<rootDir>/src'],
    'setupFiles': [
        '<rootDir>/config/jest/test-shim.js',
        '<rootDir>/config/jest/test-setup.js'
    ],
    'setupTestFrameworkScriptFile': '<rootDir>/config/jest/test-setup.js',
    'moduleFileExtensions': [
        'ts',
        'tsx',
        'js',
        'jsx',
        'json'
    ],
    'transform': {
        '^.+\\.tsx?$': 'ts-jest'
    },
    'testRegex': '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    'moduleNameMapper': {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/config/jest/__mocks__/fileMock.js',
        '\\.(css|less|scss)$': '<rootDir>/config/jest/__mocks__/fileMock.js'
    },
    'collectCoverage': true,
    'collectCoverageFrom': ['src/renderer/**/*.tsx'],
    'snapshotSerializers': ['enzyme-to-json/serializer'],
    'resolver': 'jest-webpack-resolver',
    'testURL': 'http://localhost',
};
