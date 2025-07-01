import axios from "axios";

export const uploadItemPresignedUrl = async ({objectName }: {objectName: string }) => {
    const response = await axios.put('/api/v1/util/minio-api', { type: 'upload', objectName });
    const { data } = response.data;
    return data;
};

export const removeItemByName = async ({objectName }: {objectName: string }) => {
    const response = await axios.delete('/api/v1/util/minio-api', {
        data: { type: 'delete', objectName }
    });
    const data = response.data;
    return data;
};