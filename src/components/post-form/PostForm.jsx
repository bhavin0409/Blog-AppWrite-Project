import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, RTE, Select } from '../index'
import databaseService from "../../appwrite/database.service"
import fileService from "../../appwrite/file.service"
import { data, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import Loading from '../loader/Loading'

const PostForm = ({ post }) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(!post);
    const [submitting, setSubmitting] = useState(false); // <-- Add this

    const { register, handleSubmit, watch, control, setValue, getValues, reset } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    })

    const userData = useSelector((state) => state.auth.userData)

    const onsubmit = async (data) => {
        setSubmitting(true); // <-- Disable button
        try {
            if (post) {
                const file = (data.image && data.image[0]) ? await fileService.fileUpload(data.image[0]) : null;

                if (file) {
                    fileService.deleteFile(post.featured - Image)
                }

                const dbPost = await databaseService.updatePost(post.$id, {
                    ...data,
                    "featured-Image": file ? file.$id : undefined
                })

                if (dbPost && dbPost.$id) {
                    navigate(`/post/${dbPost.$id}`)
                }
            } else {
                if (!data.image || !data.image[0]) {
                    alert("Featured image is required!");
                    setSubmitting(false); // <-- Re-enable if error
                    return;
                }

                const file = data.image[0] ? await fileService.fileUpload(data.image[0]) : null

                if (!file) {
                    alert("Image upload failed!");
                    setSubmitting(false); // <-- Re-enable if error
                    return;
                }

                if (file) {
                    const fileID = file.$id
                    data["featuredImage"] = fileID

                    const dbPost = await databaseService.createPost({
                        ...data,
                        userID: userData.$id,
                    })

                    if (dbPost && dbPost.$id) {
                        navigate(`/post/${dbPost.$id}`)
                    }
                }
            }
        } finally {
            setSubmitting(false); // <-- Always re-enable after submit
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value == 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/\s+/g, '-')
        }
        return ''
    })

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name == 'title') {
                setValue('slug', slugTransform(value.title), {
                    shouldValidate: true
                })
            }
        })

        return () => {
            subscription.unsubscribe()
        }

    }, [watch, slugTransform, setValue])

    useEffect(() => {
        if (post) {
            reset({
                title: post.title || '',
                slug: post.slug || '',
                content: post.content || '',
                status: post.status || 'active',
            });
        }
    }, [post, reset]);

   

    return (
        <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col lg:flex-row flex-wrap">
            <div className="w-full lg:w-2/3 px-2 lg:px-10 flex flex-col flex-wrap">
                <Input
                    label='Title :'
                    placeholder="Enter your title"
                    className="mb-4 w-full p-2 rounded-lg"
                    {...register("title", {
                        required: {
                            value: true,
                            message: 'Please enter your title'
                        },
                        minLength: {
                            value: 5,
                            message: 'Title must be at least 5 characters long'
                        },
                    })}
                />

                <Input
                    label='Slug :'
                    placeholder="Enter your slug"
                    className="mb-4 w-full p-2 rounded-lg"
                    {...register("slug", {
                        required: {
                            value: true,
                            message: 'Slug is required'
                        },
                    })}
                    onInput={(e) => {
                        setValue('slug', slugTransform(e.currentTarget.value), {
                            shouldValidate: true
                        })
                    }}
                />

                <RTE
                    label='Content :'
                    name="content"
                    control={control}
                    defaultValue={getValues('content')}
                />
            </div>

            <div className="w-full lg:w-1/3 px-2 lg:px-8 flex flex-col items-start mt-6 lg:mt-0">
                <Input
                    label='Featured Image :'
                    type="file"
                    className="mb-4 w-full p-2"
                    accept="image/jpg, image/png, image/jpeg, image/gif, image/bmp"
                    {...register("image", {
                        required: !post,
                    })}
                />

                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={fileService.getFilePreview(post["featured-Image"])}
                            alt={post.title}
                            className="rounded-lg w-full max-h-60 object-contain"
                        />
                    </div>
                )}

                <Select
                    options={['Active', 'Inactive']}
                    label='Status :'
                    className='mb-4 w-full'
                    {...register('status', {
                        required: {
                            value: true,
                            message: 'Status is required'
                        }
                    })}
                />

                <Button
                    type='submit'
                    bgColor={post ? 'bg-green-500' : 'bg-blue-500'}
                    classname='w-full'
                    disabled={submitting} // <-- Disable while submitting
                >
                    {submitting ? (post ? 'Updating...' : 'Creating...') : (post ? 'Update Post' : 'Create Post')}
                </Button>
            </div>
        </form>
    )
}

export default PostForm