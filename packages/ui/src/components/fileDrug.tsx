import React from 'react'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import Dropzone from 'react-dropzone'
import { Icons } from './icons'
import { Alert, AlertDescription } from '../shadcn/ui/alert'



interface FileUploadProps {
    name: string
    control: any
    disabled?: boolean;
    onChange?: (file: File, rawData: any) => void
}

export const ReactDropzone = ({ name, control, onChange, disabled = false }: FileUploadProps) => {
    const [file, setFile] = useState<any>(null)
    const [fileSelect, setFileSelect] = useState<any>(null)
    const handleValidFileType = (file: File) => {
        if (
            name !== ',' &&
            (file.type === 'image/jpg' ||
                file.type === 'image/jpeg' ||
                file.type === 'image/png' ||
                file.type === 'application/pdf')
        ) {
            return true
        }
        setFile(null)
        return false
    }
    const clearFile = () => {
        if (!disabled) {
            setFile(null)
            onChange && onChange(file, null);
            setFileSelect(null);
        }
    }
    const handleFileUpload = (event: any) => {
        const file = event
        setFile(file)
        onChange && file && onChange(event, event);
        setFileSelect({ name: file?.name });
        // const reader: any = new FileReader()
        // reader.onloadend = (e: any) => {
        // 	const rawData = reader.result as string
        // }
        // file && reader.readAsDataURL(file)
    }

    return (
        <>
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <Dropzone
                        onDrop={(e) => {
                            if (!disabled) {
                                field.onChange(e[0])
                                handleFileUpload(e[0])
                            }
                        }}
                        disabled={disabled}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <div
                                        style={{
                                            cursor: disabled ? 'not-allowed' : 'pointer',
                                            width: '100%',
                                            height: 'max-content',
                                            borderRadius: '4px',
                                            border: '1px dashed ',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                            marginBottom: '1rem',
                                            padding: '20px 0px 10px 0px',
                                            // color: 'rgba(0,0,0,0.7)'
                                        }}
                                    >

                                        {fileSelect
                                            ?
                                            (<>
                                                <Icons.cloudUpload style={{ fontSize: '3em' }} />
                                                <p>{fileSelect?.name}</p>
                                            </>)
                                            :
                                            (<>
                                                <Icons.archiveRestore style={{ fontSize: '3em' }} />
                                                <p>Please drag and drop file or click here</p>
                                            </>)
                                        }
                                    </div>
                                </div>
                            </section>
                        )}
                    </Dropzone >
                )}
            />

            {
                file && handleValidFileType(file) && (
                    <>
                        <Alert>
                            <p> <Icons.x style={{ fontSize: '3em' }} onClick={clearFile} /></p>
                            <AlertDescription>
                                <p>{file?.name}</p>
                                <p>{`${file?.size} Kb`}</p>
                            </AlertDescription>
                        </Alert>
                    </>
                )
            }
        </>
    )
}
