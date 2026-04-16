import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {postImage, getPreviewImages, getTasks} from "@entities/image/imageList/model/imageListThunk.ts";
import {IImageListState} from "@entities/image/imageList";
import {ImageType} from "@shared/api/image";
import {getSocket} from "@shared/lib";
import {UpdateImageStatusType} from "@shared/api/image/types.ts";

const data: ImageType[] = [
  {
    guid: "null1",
    name: "file1.png",
    status: "completed",
    upscale: "2x",
    processTime: "15s",
  },
  {
    guid: "null2",
    name: "file2.png",
    status: "queued",
    upscale: "2x",
    processTime: "17s",
  },
  {
    guid: "null3",
    name: "file1.png",
    status: "running",
    upscale: "2x",
    processTime: "1m",
  },
  {
    guid: "null4",
    name: "file3.png",
    status: "failed",
    upscale: "4x",
    processTime: "-",
  }
]

const initialState: IImageListState = {
  totalCountImages: 17,
  images: data,
  loading: false,
  error: null,
  previewLoading: false,
  previewError: null,
}

const imageListSlice = createSlice({
  name: 'imageList',
  initialState,
  reducers: {
    clearImageListStore: (state) => {
      state.totalCountImages = 0;
      state.images = [];
      state.loading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    removeImageTask: (state, action: PayloadAction<string>) => {
      state.images = state.images.filter(el => el.guid !== action.payload);
    },
    removeImageTasks: (state, action: PayloadAction<string[]>) => {
      state.images = state.images.filter(el => !action.payload.includes(el.guid));
    },
    updateImageStatus: (
      state,
      action: PayloadAction<UpdateImageStatusType>
    ) => {
      const { guid, status } = action.payload;
      const img = state.images?.find((i) => i.guid === guid && i.status != status);
      if (img) {
        img.status = status;
      }
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(postImage.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(postImage.fulfilled, (state, action) => {
        state.images = state.images ? [...state.images, {...action.payload}] : [action.payload]
        state.totalCountImages = state.images.length
        state.loading = false
        state.error = null

        const ws = getSocket();

        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: "subscribe", guids: state.images.map(i => i.guid) }));
        }
      })
      .addCase(postImage.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.messageError ?? null
      })
      .addCase(getPreviewImages.pending, (state) => {
        state.previewLoading = true;
        state.previewError = null;
      })
      .addCase(getPreviewImages.fulfilled, (state) => {
        state.previewLoading = false;
        state.previewError = null;
      })
      .addCase(getPreviewImages.rejected, (state, action) => {
        state.previewLoading = false;
        state.previewError = action.payload?.messageError ?? 'Failed to load original image';
      })
      .addCase(getTasks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        action.payload.forEach((taskMap) => {
          const [guid, status] = Object.entries(taskMap)[0] ?? []
          if (!guid || !status) return

          const image = state.images.find((img) => img.guid === guid)
          if (image && image.status !== status) {
            image.status = status
          }
        })

        state.totalCountImages = state.images.length
        state.loading = false
        state.error = null
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.messageError ?? null
      })

})

export const {clearImageListStore, clearError, updateImageStatus, removeImageTask, removeImageTasks} = imageListSlice.actions
export default imageListSlice.reducer