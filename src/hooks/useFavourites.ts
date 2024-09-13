import { useEffect, useState } from "react";
import FavouritesLocalStorageApi from "../api/FavouritesLocalStorageApi";

export default function useFavourites() {
    const [favourites, setFavourites] = useState([]);
    const [version, setVersion] = useState(0);

    useEffect(() => {
        if (!process.browser) {
            return;
        }

        const favourites = FavouritesLocalStorageApi.getFavourites();
        setFavourites(favourites);
    }, [process.browser, version]);

    const addFavourite = (type, id) => {
        FavouritesLocalStorageApi.addFavourite(type, id);
        setVersion(version + 1);
    };

    const removeFavourite = (type, id) => {
        FavouritesLocalStorageApi.removeFavourite(type, id);
        setVersion(version + 1);
    };

    return {
        favourites,
        hasFavourites: favourites.length > 0,
        addFavourite,
        removeFavourite,
        hasFavourite: FavouritesLocalStorageApi.hasFavourite,
    };
}
