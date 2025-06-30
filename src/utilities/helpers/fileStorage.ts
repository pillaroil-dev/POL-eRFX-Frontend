export const uploadItemPresignedUrl = async ({objectName }: {objectName: string }) => {
    const response = await fetch('/api/v1/util/minio-api', {
        method: 'PUT',
        body: JSON.stringify({ type: 'upload',objectName }),
    });
    return response.json()
};

export const removeItemByName = async ({objectName }: {objectName: string }) => {
    const response = await fetch('/api/v1/util/minio-api', {
        method: 'DELETE',
        body: JSON.stringify({ type: 'delete',objectName }),
    });
    return response.json()
};