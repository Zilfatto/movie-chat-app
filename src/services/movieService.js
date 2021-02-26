import http from './httpService';
import { moviesSourceUrl } from '../config.json';

// Request movies from the specified EndPoint
export function getMovies() {
    return http.get(moviesSourceUrl);
}