import {createSelector} from '@reduxjs/toolkit'
import {IImageListState} from "@entities/image/imageList";


const selectBase = createSelector(
  (state: RootState) => state,
  (state) => state.image
)

export const selectImageListImages = createSelector(
  selectBase,
  (state: IImageListState)=> state.images
)

export const selectImageListImagesGuid = createSelector(
  selectBase,
  (state: IImageListState)=> state.images?.map((i) => i.guid)
)