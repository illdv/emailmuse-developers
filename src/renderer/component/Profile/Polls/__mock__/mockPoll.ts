export const mockPoll = {
  title: 'SomeTitle',
  description: 'SomeTitle',
  questions: [
    {
      title: 'Which framework is best for mobile development?',
      description: 'Mobile development frameworks offer developers a ' +
      'basic skeleton that can be adapted for mobile app software',
      answers: [
        { id: '123', body: 'Ionic' },
        { id: '124', body: 'React Native' },
        { id: '125', body: 'Appcelerator Titanium' },
      ],
    },
    {
      title: 'Do you like a hamburger?',
      description: 'so good',
      answers: [
        { id: '126', body: 'yes' },
        { id: '127', body: 'no' },
        { id: '128', body: 'no, I like Shaurma' },
      ],
    },
    {
      title: 'Batman or Superman',
      description: '???',
      answers: [
        { id: '129', body: 'Batman' },
        { id: '130', body: 'Superman' },
        { id: '131', body: 'I dont know!' },
      ],
    },
  ],
};

export default mockPoll;
