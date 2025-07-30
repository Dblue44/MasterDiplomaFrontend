import {ImageType} from "@shared/api/image";

export interface IImageListState {
  totalCountImages: number,
  images: ImageType[],
  loading: boolean,
  error: string | null
}