import {apiInstance} from "@shared/api";
import {
  PostImageType, ImageListType, ImagesDataType, OriginalImageRequest, GetTasksResponse, ImagesCancelResult,
  PostImageResponseType, postImageResponseSchema
} from "@shared/api/image";

export const getResultsPostImage = async ({file}: PostImageType): Promise<PostImageResponseType> => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append("scale", "2")

  const data = await apiInstance.postImage<unknown>(`/upload`, formData)

  return postImageResponseSchema.parse(data)
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