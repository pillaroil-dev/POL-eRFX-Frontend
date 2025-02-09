export const uploadItemPresignedUrl = async ({ bucketName, objectName }: { bucketName: string, objectName: string }) => {
    const response = await fetch('/api/v1/util/minio-api', {
        method: 'PUT',
        body: JSON.stringify({ type: 'upload', bucketName, objectName }),
    });
    return response.json();
};

export const removeItemByName = async ({ bucketName, objectName }: { bucketName: string, objectName: string }) => {
    const response = await fetch('/api/v1/util/minio-api', {
        method: 'DELETE',
        body: JSON.stringify({ type: 'delete', bucketName, objectName }),
    });
    return response.json();
};