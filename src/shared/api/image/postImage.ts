import {apiInstance} from "@shared/api";
import {PostImageType, ImageType} from "@shared/api/image";

const BASE_URL = 'v1'

export const getResultsPostImage = ({file}: PostImageType): Promise<ImageType> => {
  const formData = new FormData()
  formData.append('file', file)
  return apiInstance.postImage<ImageType>(`${BASE_URL}/upload`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
}