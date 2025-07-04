import { Editor } from '@tinymce/tinymce-react'
import React from 'react'
import { Controller } from 'react-hook-form'
import config from '../config/config'
import Loading from './loader/Loading'

const RTE = ({
    name,
    control,
    label,
    defaultValue = '',
}) => {
    return (
        <div className="w-full">
            {label && (
                <label className="inline-block mb-1 pl-1">
                    {label}
                </label>
            )}
            <Controller
                name={name || "content"}
                control={control}
                render={({ field: { onChange } }) => (
                    <div className="w-full">
                        <Editor
                            apiKey={config.TinyMCE}
                            initialValue={defaultValue}
                            init={{
                                initialValue: defaultValue,
                                height: 500,
                                width: '100%', // Make editor take full width of its container
                                menubar: true,
                                plugins: [
                                    "image",
                                    "advlist",
                                    "autolink",
                                    "lists",
                                    "link",
                                    "image",
                                    "charmap",
                                    "preview",
                                    "anchor",
                                    "searchreplace",
                                    "visualblocks",
                                    "code",
                                    "fullscreen",
                                    "insertdatetime",
                                    "media",
                                    "table",
                                    "code",
                                    "help",
                                    "wordcount",
                                    "anchor",
                                ],
                                toolbar:
                                    "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help | code",
                                content_style:
                                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                // No setup needed for resizeTo
                            }}
                            onEditorChange={onChange}
                        />
                    </div>
                )}
            />
        </div>
    ) || <Loading />;
}

export default RTE