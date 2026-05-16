import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {postImage, getPreviewImages, getTasks} from "@entities/image/imageList/model/imageListThunk.ts";
import {IImageListState} from "@entities/image/imageList";
import {UpdateImageStatusType} from "@shared/api/image/types.ts";

const initialState: IImageListState = {
  totalCountImages: 25,
  images: [
    {guid: "test-task-001", name: "mountain-lake.jpg", status: "running", upscale: "x2", processTime: 30},
    {guid: "test-task-002", name: "city-night.png", status: "queued", upscale: "x4", processTime: 15},
    {guid: "f286a806-84c5-42a6-ac75-e259a13ca42e", name: "product-watch.png", status: "completed", upscale: "x4", processTime: 112},
    {guid: "test-task-005", name: "old-photo-scan.png", status: "failed", upscale: "x2", processTime: 46},
    {guid: "test-task-006", name: "forest-path.jpg", status: "cancelled", upscale: "x4", processTime: 5},
    {guid: "test-task-007", name: "apartment-render.png", status: "completed", upscale: "x2", processTime: 54}
  ],
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
      state.previewLoading = false;
      state.previewError = null;
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
    incrementImageProcessTime: (
      state,
      action: PayloadAction<{ readonly guid: string; readonly seconds: number }>
    ) => {
      const img = state.images.find((i) => i.guid === action.payload.guid);
      if (img && (img.status === "queued" || img.status === "running")) {
        img.processTime += action.payload.seconds;
      }
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

export const {clearImageListStore, clearError, updateImageStatus, removeImageTask, removeImageTasks, incrementImageProcessTime} = imageListSlice.actions
export default imageListSlice.reducer
