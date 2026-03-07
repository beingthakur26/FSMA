export {removemovie} from '../reducers/movieSlice'
import axios from '../../utilis/axios'
import { loadmovie } from '../reducers/movieSlice'

export const asyncLoadmovie = (id) => async (dispatch, getState) => {
    try{
        const detail = await axios.get(`/movie/${id}`)
        const external_id = await axios.get(`/movie/${id}/external_ids`)
        const recommendations = await axios.get(`/movie/${id}/recommendations`)
        const similar = await axios.get(`/movie/${id}/similar`)
        const video = await axios.get(`/movie/${id}/videos`)
        const watch_provider = await axios.get(`/movie/${id}/watch/providers`)
        // const credit = axios.get(`/movie/${id}/credits`)
        // const images = axios.get(`/movie/${id}/images`)
        // const keywords = axios.get(`/movie/${id}/keywords`)
        // const release_date = axios.get(`/movie/${id}/release_dates`)
        // const review = axios.get(`/movie/${id}/reviews`)
        // const translation = axios.get(`/movie/${id}/translations`)
        // const list = axios.get(`/movie/${id}/lists`)

        let theUltimateDetails = {
            detail: detail.data,
            external_id: external_id.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            video: video.data.results.find(m => m.type === "Trailer"),
            watch_provider: watch_provider.data.results.IN,
            // list: list.data
        } 

        dispatch(loadmovie(theUltimateDetails))
    } catch (error) {
        console.log("Error: ", error)
    }
} 