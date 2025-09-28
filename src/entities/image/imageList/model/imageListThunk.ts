import {createAsyncThunk} from "@reduxjs/toolkit";
import {ErrorType, RejectedDataType} from "@shared/types";
import {getResultsPostImage, ImageType, PostImageType} from "@shared/api/image";

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
