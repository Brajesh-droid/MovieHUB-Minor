export { removemovie } from "../reducers/movieSlice"; // Ensure this is used correctly elsewhere
import axios from "../../utiles/axios";
import { loadmovie } from "../reducers/movieSlice"; // Removed the extra space

export const asyncloadmovie = (id) => async (dispatch, getState) => {
    try {
        const [detail, externalid, recommendations, similar, translations, videos, watchproviders] = await Promise.all([
            axios.get(`/movie/${id}`),
            axios.get(`/movie/${id}/external_ids`),
            axios.get(`/movie/${id}/recommendations`),
            axios.get(`/movie/${id}/similar`),
            axios.get(`/movie/${id}/translations`),
            axios.get(`/movie/${id}/videos`),
            axios.get(`/movie/${id}/watch/providers`)
        ]);

        let theultimatedetails = {
            detail: detail.data,
            externalid: externalid.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            translations: translations.data.translations.map((t) => t.english_name),
            videos: videos.data.results.find((m) => m.type === "Trailer"),
            watchproviders: watchproviders.data.results?.IN || null, // Safely accessing IN watch provider
        };

        dispatch(loadmovie(theultimatedetails));
        console.log(theultimatedetails);
    } catch (error) {
        console.error("Error fetching movie data: ", error); // Better error logging
    }
};
