import axios from 'axios';
import { notification } from 'antd';

// Currently this service does not have any uses, but I left it for future purposes
axios.interceptors.response.use(null, error => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

    // Show an error notification for a user
    if (!expectedError) {
        console.log(error);
        notification.error({
            title: 'Error',
            message: 'An unexpected error occurred.',
            placement: 'topRight'
        });
    }

    return Promise.reject(error);
});

// HTTP methods for easy using
const httpMethods = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};

export default httpMethods;