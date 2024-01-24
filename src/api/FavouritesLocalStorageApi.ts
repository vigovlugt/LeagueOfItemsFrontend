export default class FavouritesLocalStorageApi {
    static getFavourites() {
        if (!process.browser) {
            return [];
        }

        const favouritesString = window.localStorage.getItem("favourites");
        if (!favouritesString) {
            return [];
        }

        try {
            const favourites = JSON.parse(favouritesString);

            return favourites;
        } catch (e) {
            return [];
        }
    }

    static setFavourites(favourites) {
        if (!process.browser) {
            return;
        }

        window.localStorage.setItem("favourites", JSON.stringify(favourites));
    }

    static addFavourite(type, id) {
        if (!process.browser) {
            return;
        }

        const favourites = FavouritesLocalStorageApi.getFavourites();

        if (favourites.find((f) => f.type === type && f.id === id)) {
            return;
        }

        FavouritesLocalStorageApi.setFavourites([...favourites, { type, id }]);
    }

    static removeFavourite(type, id) {
        if (!process.browser) {
            return;
        }

        const favourites = FavouritesLocalStorageApi.getFavourites();

        FavouritesLocalStorageApi.setFavourites(
            favourites.filter((f) => !(f.type === type && f.id === id))
        );
    }

    static hasFavourite(type, id) {
        if (!process.browser) {
            return;
        }

        const favourites = FavouritesLocalStorageApi.getFavourites();

        return (
            favourites.find((f) => f.type === type && f.id === id) !== undefined
        );
    }
}
