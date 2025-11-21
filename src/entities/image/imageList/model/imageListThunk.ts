import {createAsyncThunk} from "@reduxjs/toolkit";
import {ErrorType, RejectedDataType} from "@shared/types";
import {DownloadImageListType, getResultsPostImage, ImageType, PostImageType} from "@shared/api/image";
import {downloadImageList} from "@shared/api/image/requests.ts";

export const postImage = createAsyncThunk<
  ImageType,
  PostImageType,
  { readonly rejectValue: RejectedDataType }
>('image/postImage', async ({ file }, thunkAPI) => {
  try {
    const { guid, name, status, upscale } = await getResultsPostImage({ file })
    const newImage: ImageType = {
      guid: guid,
      name: name,
      status: status,
      upscale: upscale,
      processTime: "1m",
    };
    return newImage
  } catch (err) {
    const knownError = err as ErrorType

    return thunkAPI.rejectWithValue({
      messageError: knownError.message,
      status: knownError.response?.status,
    })
  }
})

export const downloadImages = createAsyncThunk<
  boolean,
  DownloadImageListType,
  { readonly rejectValue: RejectedDataType }
>('image/downloadImages', async ({ guids }, thunkAPI) => {
  try {
    const {blob, filename} = await downloadImageList({ guids })
    return saveBlobToDisk(blob, filename)
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
