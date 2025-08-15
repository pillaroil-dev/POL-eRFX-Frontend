import {useEffect, useState} from 'react'
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { removeItemByName, uploadItemPresignedUrl } from '@/utilities/helpers/fileStorage';

export const FileUploader = () => {
    const [alert, setAlert] = useState('');
    const [loading, setLoading] = useState(false);
    const [localData, setLocalData] = useState([]);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setAlert('');
    //     }, 2500)
    // }, [alert]);

    const alertMsg = {
        success: "Upload successful ✓",
        failed: "Upload failed ✕",
        delete: "File deleted ✓",
        deleteFailed: "Delete failed ✕"
    }

    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }: any, status: string, files: any[]) => {
        setLoading(true);
        const isDone = files.filter((file) => file.meta.status === 'done').length === files.length;
        if (isDone) {
            (async () => {
                try {
                    const uploadUrls = await Promise.all(files.map(file => uploadItemPresignedUrl({ objectName: file.meta.name })));
                    const responses = await Promise.all(uploadUrls.map((uploadUrl, index) => {
                        return fetch(uploadUrl, {
                            method: 'PUT',
                            body: files[index]?.file,
                            headers: {
                                'Content-Type': files[index]?.meta?.type?.includes('pdf')
                                    ? 'application/pdf'
                                    : files[index]?.meta?.type?.includes('doc') || files[index]?.meta?.type?.includes('docx')
                                        ? 'application/msword'
                                        : files[index]?.meta?.type?.includes('xls') || files[index]?.meta?.type?.includes('xlsx')
                                            ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                                            : 'image/*',
                            },
                        });
                    }));
                    responses.forEach(response => {
                        if (response.ok) {
                            setAlert(alertMsg.success);
                        } else {
                            setAlert(alertMsg.failed);
                            console.error(alertMsg.failed, response);
                        }
                    });
                } catch (error) {
                    setAlert(alertMsg.failed);
                    console.error("Upload failed:", error);
                } finally {
                    setLoading(false);
                }
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
                    const response  = await removeItemByName({ objectName: meta.name });
                    if (!response.error) {
                        setLoading(false)
                        setAlert(alertMsg.delete);
                    } else {
                        setLoading(false)
                        setAlert(alertMsg.deleteFailed);
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
    }, [localData.length]);

    return (
        <>
            <Dropzone
                onChangeStatus={handleChangeStatus}
                autoUpload={true}
                inputContent="Drag n Drop Files or Click to Browse"
                styles={{
                    dropzoneActive: { borderColor: 'green' },
                    inputLabel:{
                        color: "#7c3aed"
                    },
                }}
                accept=".pdf, .png, .jpeg, .jpg, .doc, .docx, .xlx, .xlxs, .xml, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                classNames={{
                    dropzone: 'w-full min-h-40 relative bg-white/60 dark:bg-background-color border rounded-md p-6 md:px-2 md:py-4 !text-primary',
                    preview: 'flex justify-between !text-primary h-8 w-full px-2 text-xs ',
                    previewImage: 'text-primary',
                }}
            />
            <div className="flex justify-center items-center text-primary text-xs text-right">
                {loading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                }
                <p className={`text-primary text-sm text-right font-bold`}>
                    {loading ? 'Please wait...' : alert}
                </p>
        </div>
        </>

    )
}
