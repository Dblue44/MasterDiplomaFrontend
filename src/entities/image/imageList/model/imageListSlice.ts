import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {postImage} from "@entities/image/imageList/model/imageListThunk.ts";
import {IImageListState} from "@entities/image/imageList";
import {ImageType} from "@shared/api/image";
import {getSocket} from "@shared/lib";

const data: ImageType[] = [
  // {
  //   guid: "1",
  //   name: "file1.png",
  //   status: "completed",
  //   upscale: "2x",
  //   processTime: "15s",
  // }
  // {
  //   guid: "2",
  //   name: "file2.png",
  //   status: "queued",
  //   upscale: "2x",
  //   processTime: "17s",
  // },
  // {
  //   guid: "3",
  //   name: "file1.png",
  //   status: "queued",
  //   upscale: "2x",
  //   processTime: "1m",
  // },
  // {
  //   guid: "3",
  //   name: "file3.png",
  //   status: "working",
  //   upscale: "4x",
  //   processTime: "-",
  // },
  // {
  //   guid: "4",
  //   name: "file4.png",
  //   status: "queued",
  //   upscale: "4x",
  //   processTime: "1m55s",
  // },
  // {
  //   guid: "5",
  //   name: "file5.png",
  //   status: "completed",
  //   upscale: "3x",
  //   processTime: "39s",
  // },
  // {
  //   guid: "6",
  //   name: "file6.png",
  //   status: "completed",
  //   upscale: "2x",
  //   processTime: "15s",
  // },
  // {
  //   guid: "7",
  //   name: "file7.png",
  //   status: "queued",
  //   upscale: "2x",
  //   processTime: "17s",
  // },
  // {
  //   guid: "8",
  //   name: "file8.png",
  //   status: "queued",
  //   upscale: "2x",
  //   processTime: "1m",
  // },
  // {
  //   guid: "9",
  //   name: "file9.png",
  //   status: "working",
  //   upscale: "4x",
  //   processTime: "-",
  // },
  // {
  //   guid: "10",
  //   name: "file10.png",
  //   status: "queued",
  //   upscale: "4x",
  //   processTime: "1m55s",
  // },
  // {
  //   guid: "11",
  //   name: "file11.png",
  //   status: "completed",
  //   upscale: "3x",
  //   processTime: "39s",
  // },
  // {
  //   guid: "12",
  //   name: "file12.png",
  //   status: "completed",
  //   upscale: "2x",
  //   processTime: "15s",
  // },
  // {
  //   guid: "13",
  //   name: "file13.png",
  //   status: "queued",
  //   upscale: "2x",
  //   processTime: "17s",
  // },
  // {
  //   guid: "14",
  //   name: "file14.png",
  //   status: "queued",
  //   upscale: "2x",
  //   processTime: "1m",
  // },
  // {
  //   guid: "15",
  //   name: "file15.png",
  //   status: "working",
  //   upscale: "4x",
  //   processTime: "-",
  // },
  // {
  //   guid: "16",
  //   name: "file16.png",
  //   status: "queued",
  //   upscale: "4x",
  //   processTime: "1m55s",
  // },
  // {
  //   guid: "17",
  //   name: "file17.png",
  //   status: "completed",
  //   upscale: "3x",
  //   processTime: "39s",
  // },
]

const initialState: IImageListState = {
  totalCountImages: 17,
  images: data,
  loading: false,
  error: null,
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
    updateImageStatus: (
      state,
      action: PayloadAction<{ guid: string; status: string, error?: string }>
    ) => {
      const { guid, status } = action.payload;
      const img = state.images?.find((i) => i.guid === guid && i.status != status);
      if (img) {
        img.status = status;
        // здесь в будущем можно увеличивать processTime
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
})

export const {clearImageListStore, clearError, updateImageStatus} = imageListSlice.actions
export default imageListSlice.reducer