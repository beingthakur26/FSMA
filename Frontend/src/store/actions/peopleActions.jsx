import axios from '../../utilis/axios'
import { loadpeople, removepeople } from '../reducers/peopleSlice'

export { removepeople }

export const asyncLoadpeople = (id) => async (dispatch) => {
  try {
    // Fetch all key details in parallel
    const [detail, external_id, combined_credits, images] = await Promise.all([
      axios.get(`/person/${id}`),
      axios.get(`/person/${id}/external_ids`),
      axios.get(`/person/${id}/combined_credits`),
      axios.get(`/person/${id}/images`),
    ])

    // Combine everything into a single structured object
    const personDetails = {
      detail: detail.data,
      external_id: external_id.data,
      combined_credits: combined_credits.data,
      images: images.data.profiles,
    }

    dispatch(loadpeople(personDetails))
  } catch (error) {
    console.error('❌ Error loading person details:', error)
  }
}
