import {useEffect, useState} from 'react'
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { uploadItem, removeItemByName } from '@/utilities/helpers/s3config';

export const FileUploader = ({bucketName}: {bucketName: string}) => {
    const [alert, setAlert] = useState('');
    const [loading, setLoading] = useState(false)
    const [localData, setLocalData] = useState([])

    useEffect(() => {
        setTimeout(() => {
            setAlert('');
        }, 2500)
    }, [alert]);

    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }: any, status: string, files: any[]) => {
        setLoading(true);
        const isDone = files.filter((file) => file.meta.status === 'done').length === files.length;
        if (isDone) {
            (async () => {
                const uploadUrls = await Promise.all(files.map(file => uploadItem({ bucketName, itemName: file.meta.name })));
                const responses = await Promise.all(uploadUrls.map((uploadUrl, index) => {
                    return fetch(uploadUrl.uploadUrl, {
                        method: 'PUT',
                        body: files[index]?.file,
                        headers: {
                            'Content-Type': files[index]?.meta?.type?.includes('pdf') ? 'application/pdf' : files[index]?.meta?.type?.includes('doc') || files[index]?.meta?.type?.includes('docx') ? 'application/msword' : 'image/*',
                        },
                    });
                }));
                responses.forEach(response => {
                    if (response.ok) {
                        setAlert('Upload successful');
                    } else {
                        setAlert('Upload failed');
                        console.error('Upload failed', response);
                    }
                });
                setLoading(false);
            })();

            files.forEach((file) => {
                const fileData = {
                    name: file.meta.name,
                    size: file.meta.size,
                    path: file.meta.name.replace(/[_\s]/g, '_').toLowerCase()
                };

                setLocalData(prevData => {
                    if (!prevData.some(item => item.name === fileData.name && item.size === fileData.size && item.path === fileData.path)) {
                        return [...prevData, fileData];
                    }
                    return prevData;
                });
            });
        };
        

        

        switch (status) {
            case 'removed':
                (async () => {
                    const { deleteUrl } = await removeItemByName({ bucketName, itemName: meta.name });
                    const response = await fetch(deleteUrl, {
                        method: 'DELETE',
                        body: file,
                        headers: {
                            'Content-Type': file.type.includes('pdf') ? 'application/pdf' : file.type.includes('doc') || file.type.includes('docx') ? 'application/msword' : 'image/*',
                        },
                    });

                    if (response.ok) {
                        setLoading(false)
                        setAlert('File deleted!');
                    } else {
                        setLoading(false)
                        setAlert('Delete failed');
                    }
                })();
                setLocalData(prevData => prevData.filter(item => item.name !== meta.name));
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        window.localStorage.setItem("@files", JSON.stringify(localData));
    }, [localData?.length]);

    return (
        <>
            <Dropzone
                //getUploadParams={getUploadParams}
                onChangeStatus={handleChangeStatus}
                autoUpload={true}
                accept=".pdf, .png, .jpeg, .jpg, .doc, .docx, .xml, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                classNames={{
                    dropzone: 'w-full min-h-40 relative bg-white/60 dark:bg-background-color border rounded-md p-6 md:px-2 md:py-4 !text-foreground',
                    preview: 'flex justify-between !text-foreground h-8 w-full px-2 text-xs ',
                    previewImage: 'text-foreground',
                }}
            />
            <div className="flex justify-center items-center text-green-500 text-xs text-right">
                {loading && <svg className="animate-spin -ml-1 mr-3 h-3 w-3 text-gree-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                }
                <p className='text-green-600 text-xs text-right'>{loading ? 'Please wait...' : alert}</p>
        </div>
        </>

    )
}
