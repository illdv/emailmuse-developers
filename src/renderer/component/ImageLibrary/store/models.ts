export interface IFileInfo {
  id: number;
  name: string;
  hash: string;
  imagable_id: number;
  imagable_type: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  url: string;
  thumb_url: string;
}

export interface IGetImagesResponse {
  current_page: number;
  data: IFileInfo[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: null;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}

export interface IImageLibraryItem {
  id: number;
  /**
   * Original image.
   */
  url: string;
  /**
   * Use for preview image.
   */
  thumb_url: string;
  name: string;
}