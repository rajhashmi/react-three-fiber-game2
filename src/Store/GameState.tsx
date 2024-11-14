import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export default create(subscribeWithSelector((set,get)=>{
    return {
        phase: "ready",
        score: 0,
        land: [],
        playerRef: null,
        setLand: (landObj) => {
            set((state) => ({
                land : [...state.land, landObj],
            }))
        },
        getLand: () => {
            return get().land;  
        },
        removeFirstLand: () => {
            set((state) => {
                const updatedLand = state.land.slice(1);
                console.log("removed");
                
                return { land: updatedLand };
            });
        },
        setPlayerRef: (playerRef) => {
            set(() => ({ playerRef }));
          },
          getPlayerRef: () => {
            return get().playerRef; 
          },
        start: () =>
            {
                set((state) =>
                {
                    if(state.phase === 'ready')
                        return { phase: 'playing'}
                    return {}
                })
        }
    }
}))