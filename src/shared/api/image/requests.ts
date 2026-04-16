import {apiInstance} from "@shared/api";
import {
  PostImageType, ImageType, ImageListType, ImagesDataType, OriginalImageRequest, GetTasksResponse, ImagesCancelResult
} from "@shared/api/image";

export const getResultsPostImage = ({file}: PostImageType): Promise<ImageType> => {
  const formData = new FormData()
  formData.append('file', file)
  return apiInstance.postImage<ImageType>(`/upload`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
}

export const downloadImageList = ({guids}: ImageListType): Promise<ImagesDataType> => {
  return apiInstance.downloadPost(`/downloadImages`, guids, {
    responseType: 'blob',
    withCredentials: true,
    headers: {'Content-Type': 'application/json'},
  })
}

export const cancelImageList = ({guids}: ImageListType): Promise<ImagesCancelResult> => {
  return apiInstance.post(`/cancelTasks`, guids)
}

export const getOriginalImage = ({guid}: OriginalImageRequest): Promise<ImagesDataType> => {
  return apiInstance.getFile(`/downloadOriginalImage`, guid, {
    responseType: 'blob',
    withCredentials: true,
    headers: {'Content-Type': 'application/json'}
  })
}

export const getTasksStatuses = ({guids}: ImageListType): Promise<GetTasksResponse> => {
  return apiInstance.post(`/getTasks`, guids, {
    withCredentials: true,
    headers: {'Content-Type': 'application/json'},
  })
}