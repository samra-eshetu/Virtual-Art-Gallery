import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = '@EthiopianArtGallery:favorites';

export type FavoriteItem = {
    id: string;
    title: string;
    artist: string;
    date: string;
    image: string;
};

//get all favorites
export const getFavorites = async(): Promise<FavoriteItem[]>=>{
    try{
        const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
        return jsonValue != null ? JSON.parse(jsonValue):[];
    } catch(e){
        console.error('Error loading favorites:', e);
        return[];
    }

};

//check if an artwork is favorited
export const isFavorited = async (id: string): Promise<boolean>=>{
     const favorites = await getFavorites();
     return favorites.some(item=>item.id===id);
};

//add to favorite
export const addFavorite = async (item: FavoriteItem): Promise<void>=>{
    try{
        const favorites = await getFavorites();
        if(!favorites.some(f=>f.id===item.id)){
            favorites.push(item);
            await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
        }
    } catch(e){
        console.error('Error adding favorites:', e);
    }
};

//Remove from favorites
export const removeFavorites= async(id: string): Promise<void>=>{
    try{
        const favorites = await getFavorites();
        const updated = favorites.filter(item=>item.id!==id);
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));

    }catch(e){
        console.error('Error removing favorites:', e);
    }
}
//Toggle favorites(addor remove)

export const toggleFavorites = async (item:FavoriteItem): Promise<boolean>=>{
    const current = await isFavorited(item.id);
    if(current){
        await removeFavorites(item.id);
        return false;
    }else{
        await addFavorite(item);
        return true;
    }
}