export interface ITrainingVideo {
  title: string;
  description: string;
  video_code: string;
}

export interface ITopic {
  title: string;
  item: ITrainingVideo;
}

export interface ITraining {
  title: string;
  items: ITopic[];
}
