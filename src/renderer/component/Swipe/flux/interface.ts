export interface ISubject {
  day: number;
  description: string;
  title: string;
  body: string;
}

export interface ISwipe {
  title: string;
  subjects: ISubject[];
}
