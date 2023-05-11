import { createContext, useContext, useEffect, useReducer } from "react";

const reducer = (crrState, action) => {
    switch(action.type) {
        case 'addItem':
            if(crrState?.some(fav => fav.id === action.info.id)) return crrState;
            const newArrayFavs = [...crrState];
            newArrayFavs.push({
                name:action.info.name,
                id:action.info.id,
                score:action.info.score,
                type:action.info.type,
                posterImg:action.info.posterImg,
            });
            return newArrayFavs
        case 'removeItem':
            console.log(crrState);
            const newArrayToRemove = [...crrState];
            const itemToRemove = newArrayToRemove.findIndex(item => item.id == action.info.id)
            newArrayToRemove.splice(itemToRemove, 1)
            return newArrayToRemove
    }
}

const FavoriteContext = createContext(undefined);

export const FavoriteProvider = ({children}) => {
    const [favItems, dispatch] = useReducer(reducer, JSON.parse(localStorage.getItem('FAVORITE_ITEMS')) || []);

    useEffect(() => {
        localStorage.setItem('FAVORITE_ITEMS', JSON.stringify(favItems));
    }, [favItems]);

    return (
    <FavoriteContext.Provider value={{
        favItems,
        dispatch
    }}>
        {children}
    </FavoriteContext.Provider>
    )
}

export const useFavContext = () => useContext(FavoriteContext);