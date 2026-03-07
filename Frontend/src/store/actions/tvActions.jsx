import axios from '../../utilis/axios'
import { loadtv, removetv } from '../reducers/tvSlice'

export { removetv }

export const asyncLoadtv = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/tv/${id}`)
    const external_id = await axios.get(`/tv/${id}/external_ids`)
    const recommendations = await axios.get(`/tv/${id}/recommendations`)
    const similar = await axios.get(`/tv/${id}/similar`)
    const video = await axios.get(`/tv/${id}/videos`)
    const watch_provider = await axios.get(`/tv/${id}/watch/providers`)
    const content_rating = await axios.get(`/tv/${id}/content_ratings`)

    const indiaRating =
      content_rating.data.results.find((c) => c.iso_3166_1 === 'IN') ||
      content_rating.data.results[0]

    let theUltimateDetails = {
      detail: detail.data,
      external_id: external_id.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      video: video.data.results.find((m) => m.type === 'Trailer'),
      watch_provider: watch_provider.data.results.IN,
      content_rating: indiaRating?.rating,
    }

    dispatch(loadtv(theUltimateDetails))
  } catch (error) {
    console.log('Error loading TV details:', error)
  }
}
