"use client";

import type { AppDispatch, AppStore, RootState } from "@/store";
import { useDispatch, useSelector, useStore } from "react-redux";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore: () => AppStore = useStore;
