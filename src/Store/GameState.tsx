// @ts-nocheck

import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface GameStateType {
  phase: string;
  score: number;
  land: any[];
  playerRef: any | null;
  setLand: (landObj: any) => void;
  getLand: () => any[];
  removeFirstLand: () => void;
  setPlayerRef: (playerRef: any) => void;
  getPlayerRef: () => any | null;
  start: () => void;
}

export default create<GameStateType>(
  subscribeWithSelector((set, get) => ({
    phase: "ready",
    score: 0,
    land: [],
    playerRef: null,
    setLand: (landObj) => {
      set((state) => ({
        land: [...state.land, landObj],
      }));
    },
    getLand: () => {
      return get().land;
    },
    removeFirstLand: () => {
      set((state) => {
        const updatedLand = state.land.slice(1);
        return { land: updatedLand };
      });
    },
    setPlayerRef: (playerRef) => {
      set(() => ({ playerRef }));
    },
    getPlayerRef: () => {
      return get().playerRef;
    },
    start: () => {
      set((state) => {
        if (state.phase === "ready") return { phase: "playing" };
        return {};
      });
    },
  }))
);
