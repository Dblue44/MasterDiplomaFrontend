import {createAsyncThunk} from "@reduxjs/toolkit";
import {ErrorType, RejectedDataType} from "@shared/types";
import {
  getResultsPostImage,
  ImageListType,
  DownloadImageListType,
  DownloadOriginalImageType,
  ImageType,
  PostImageType,
  getOriginalImage as fetchOriginalImageFromApi,
  ImagePreviewPayload,
  ImageUrlPayload,
  ImagesCancelResult,
  GetTasksResponse,
  postImageSchema
} from "@shared/api/image";
import {cancelImageList, downloadImageList, getTasksStatuses} from "@shared/api/image/requests.ts";
import {CancelErrorType} from "@shared/types/errorTypes.ts";
import {z} from "zod";

export const postImage = createAsyncThunk<
  ImageType,
  PostImageType,
  { readonly rejectValue: RejectedDataType }
>('image/postImage', async (payload, thunkAPI) => {
  try {
    const { file } = postImageSchema.parse(payload)

    const {guid, name, status, upscale} = await getResultsPostImage({file})

    return {
      guid: guid,
      name: name,
      status: status,
      upscale: upscale,
      processTime: 0,
    };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return thunkAPI.rejectWithValue({
        messageError: "Некорректные данные изображения",
      })
    }

    const knownError = err as ErrorType

    return thunkAPI.rejectWithValue({
      messageError: knownError.response?.data?.detail ?? knownError.message ?? "Unknown error",
      status: knownError.response?.status,
    })
  }
})

export const cancelImages = createAsyncThunk<
  ImagesCancelResult,
  ImageListType,
  { readonly rejectValue: RejectedDataType }
>('image/cancelImages', async ({guids}, thunkAPI) => {
  try {
    return await cancelImageList({guids})
  } catch (err) {
    const knownError = err as CancelErrorType

    return thunkAPI.rejectWithValue({
      messageError: knownError.response?.data?.error ?? "Unknown error",
    })
  }
})

export const downloadImages = createAsyncThunk<
  ImageUrlPayload,
  DownloadImageListType,
  { readonly rejectValue: RejectedDataType }
>('image/downloadImages', async ({guids, needSave}, thunkAPI) => {
  try {
    const {blob, filename} = await downloadImageList({guids})
    if (needSave) {
      saveBlobToDisk(blob, filename)
    }
    const url = URL.createObjectURL(blob);
    return {url, filename};
  } catch (err) {
    const knownError = err as ErrorType

    return thunkAPI.rejectWithValue({
      messageError: knownError.message,
      status: knownError.response?.status,
    })
  }
})

function saveBlobToDisk(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
  return true
}

export const getPreviewImages = createAsyncThunk<
  ImagePreviewPayload,
  DownloadOriginalImageType,
  { readonly rejectValue: RejectedDataType }
>('image/getPreviewImages', async ({guid}, thunkAPI) => {
  try {
    const originalResponse = await fetchOriginalImageFromApi({guid})
    const urlOriginal = URL.createObjectURL(originalResponse.blob);
    const resultResponse = await downloadImageList({guids: [guid]})
    const urlResult = URL.createObjectURL(resultResponse.blob);
    return {urlOriginal: urlOriginal, filenameOriginal: originalResponse.filename, urlResult: urlResult, filenameResult: resultResponse.filename};
  } catch (err) {
    const knownError = err as ErrorType

    return thunkAPI.rejectWithValue({
      messageError: knownError.response?.data?.detail ?? "Unknown error",
      status: knownError.response?.status,
    })
  }
})

export const getTasks = createAsyncThunk<
  GetTasksResponse,
  ImageListType,
  { readonly rejectValue: RejectedDataType }
>('image/getTasks', async ({guids}, thunkAPI) => {
  try {
    return await getTasksStatuses({guids})
  } catch (err) {
    const knownError = err as ErrorType

    return thunkAPI.rejectWithValue({
      messageError: knownError.response?.data?.detail ?? "Unknown error",
      status: knownError.response?.status,
    })
  }
})
