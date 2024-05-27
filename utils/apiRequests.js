import axios from 'axios';

export const postRequest = async ({ url = null, data = null, header = 'json' }) => {
    try {
        const response = await axios({
            method: 'post',
            url: url,
            headers: {
                'Content-Type': header === 'json' ? 'application/json' : 'multipart/form-data'
            },
            data: data
        });

        if (response.data) {
            return response.data;
        }
        return null;

    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getRequest = async ({ url = null, data = null }) => {
    try {
        const response = await axios({
            method: 'get',
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.data) {
            return response.data;
        }
        return null;

    } catch (error) {
        console.error(error);
        return null;
    }
};
