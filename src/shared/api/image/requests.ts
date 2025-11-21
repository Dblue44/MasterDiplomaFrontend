import {apiInstance} from "@shared/api";
import {PostImageType, ImageType, DownloadImageListType, ImagesDataType} from "@shared/api/image";


export const getResultsPostImage = ({file}: PostImageType): Promise<ImageType> => {
  const formData = new FormData()
  formData.append('file', file)
  return apiInstance.postImage<ImageType>(`/upload`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
}

export const downloadImageList = ({guids}: DownloadImageListType): Promise<ImagesDataType> => {
  return apiInstance.downloadPost(`/downloadImages`, guids, {responseType: 'blob', withCredentials: true, headers: { 'Content-Type': 'application/json' },})
}