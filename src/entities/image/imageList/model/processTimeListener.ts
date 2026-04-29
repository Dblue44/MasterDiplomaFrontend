import {createListenerMiddleware, type Dispatch} from "@reduxjs/toolkit";
import {getTasks, postImage} from "./imageListThunk.ts";
import {
  clearImageListStore,
  incrementImageProcessTime,
  removeImageTask,
  removeImageTasks,
  updateImageStatus
} from "./imageListSlice.ts";

const PROCESS_TIME_TICK_SECONDS = 5;
const PROCESS_TIME_TICK_MS = PROCESS_TIME_TICK_SECONDS * 1000;
const activeStatuses = new Set<string>(["queued", "running"]);
const terminalStatuses = new Set<string>(["completed", "cancelled", "failed"]);

const timers = new Map<string, ReturnType<typeof setInterval>>();

export const imageProcessTimeListenerMiddleware = createListenerMiddleware();

const startTimer = (
  guid: string,
  status: string,
  dispatch: Dispatch
) => {
  if (!activeStatuses.has(status) || timers.has(guid)) return;

  const timerId = setInterval(() => {
    dispatch(incrementImageProcessTime({guid, seconds: PROCESS_TIME_TICK_SECONDS}));
  }, PROCESS_TIME_TICK_MS);

  timers.set(guid, timerId);
};

const stopTimer = (guid: string) => {
  const timerId = timers.get(guid);
  if (!timerId) return;

  clearInterval(timerId);
  timers.delete(guid);
};

const stopAllTimers = () => {
  timers.forEach((timerId) => clearInterval(timerId));
  timers.clear();
};

imageProcessTimeListenerMiddleware.startListening({
  actionCreator: postImage.fulfilled,
  effect: (action, listenerApi) => {
    startTimer(action.payload.guid, action.payload.status, listenerApi.dispatch);
  },
});

imageProcessTimeListenerMiddleware.startListening({
  actionCreator: updateImageStatus,
  effect: (action) => {
    if (terminalStatuses.has(action.payload.status)) {
      stopTimer(action.payload.guid);
    }
  },
});

imageProcessTimeListenerMiddleware.startListening({
  actionCreator: getTasks.fulfilled,
  effect: (action) => {
    action.payload.forEach((taskMap) => {
      const [guid, status] = Object.entries(taskMap)[0] ?? [];
      if (guid && status && terminalStatuses.has(status)) {
        stopTimer(guid);
      }
    });
  },
});

imageProcessTimeListenerMiddleware.startListening({
  actionCreator: removeImageTask,
  effect: (action) => {
    stopTimer(action.payload);
  },
});

imageProcessTimeListenerMiddleware.startListening({
  actionCreator: removeImageTasks,
  effect: (action) => {
    action.payload.forEach(stopTimer);
  },
});

imageProcessTimeListenerMiddleware.startListening({
  actionCreator: clearImageListStore,
  effect: () => {
    stopAllTimers();
  },
});
