import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

// استيراد الـ Reducers العادية (Features)
import userReduser from "./features/User/userSlice";

import settingsModalReducer from "./features/settings/settingsModalSlice";

// استيراد واجهات RTK Query APIs
import { userApi } from "./features/User/userApi";
import { CoursesApi } from "./features/Courses/CoursesApi";
import { CurriculumsApi } from "./features/Curriculum/CurriculumApi";
import { CommentsApi } from "./features/Comments/CommentsApi";
import { OfferApi } from "./features/Offer/OfferApi";
import { ComplaintsApi } from "./features/Complaints/ComplaintsApi";
import { contactApi } from "./features/Contacts/contactApi";

// 1. دمج كل الـ reducers في reducer واحد رئيسي
const rootReducer = combineReducers({
  // Reducers العادية
  user: userReduser,
  settingsModal: settingsModalReducer,

  // Reducers الخاصة بـ RTK Query
  [contactApi.reducerPath]: contactApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [CoursesApi.reducerPath]: CoursesApi.reducer,
  [CurriculumsApi.reducerPath]: CurriculumsApi.reducer,
  [CommentsApi.reducerPath]: CommentsApi.reducer,
  [OfferApi.reducerPath]: OfferApi.reducer,
  [ComplaintsApi.reducerPath]: ComplaintsApi.reducer,
});

// 2. إعداد الـ Store
export const store = configureStore({
  reducer: rootReducer, // استخدام الـ rootReducer مباشرةً
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      // إضافة الـ middleware لكل APIs
      userApi.middleware,
      CoursesApi.middleware,
      CurriculumsApi.middleware,
      CommentsApi.middleware,
      OfferApi.middleware,
      ComplaintsApi.middleware,
      contactApi.middleware
    ),
});

// 3. تعريف أنواع مساعدات لاستخدام useSelector و useDispatch بشكل آمن
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
