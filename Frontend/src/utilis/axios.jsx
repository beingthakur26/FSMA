import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWEyNjQ0MTFmOTg4M2YyYTU0ZjE0ZWYyNjYwMzE2OCIsIm5iZiI6MTc2MTI0NzAyNS41MDEsInN1YiI6IjY4ZmE3ZjMxNGYwMmViNDJjYjEyODE3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hTyx6YC68GNqwSfkh07fOs-BRRNiW7gAl7nERQMDJ_Y'
    }
});

export default instance;