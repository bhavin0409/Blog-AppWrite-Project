import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, RTE, Select } from '../index'
import databaseService from "../../appwrite/database.service"
import fileService from "../../appwrite/file.service"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const PostForm = ({ post }) => {
    const navigate = useNavigate()

    const { register, handleSubmit, watch, control, setValue, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    })

    const userData = useSelector((state) => state.user.userData)

    const onsubmit = async (data) => {
        if (post) {
            const file = data.image[0] ? await fileService.fileUpload(data.image[0]) : null

            if (file) {
                fileService.deleteFile(post.featuredImage)
            }

            const dbPost = await databaseService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined
            })

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        } else {
            const file = data.image[0] ? await fileService.fileUpload(data.image[0]) : null

            if (file) {
                const fileID = file.$id
                data.featuredImage = fileID

                const dbPost = await databaseService.createPost({
                    ...data,
                    userID: userData.$id,
                })

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value == 'string') {
            return value
            .trim()
            .toLowerCase()
            .replace(/^[a-zA-z\d\s]/g , '-')
            .replace(/^\s/g , '-')
        }
        return ''
    })

    useEffect(() => {
        const subscription = watch((value , {name}) => {
            if (name == 'title') {
                setValue('slug' , slugTransform(value.title) , {
                    shouldValidate:true
                })
            }
        })

        return () => {
            subscription.unsubscribe()
        }
        
    }, [watch , slugTransform , setValue])
    


    return (
        <form onSubmit={handleSubmit(onsubmit)} className='flex flex-wrap'>
            <div className="w-2/3 px-2" >
                <Input 
                    label='Title :'
                    placeholder="Enter your title"
                    className="mb-4"
                    {...register("title", {
                        required:{
                            value:true ,
                            message:'Please enter your title'
                        },
                        minLength:{
                            value: 5,
                            message: 'Title must be at least 5 characters long'
                        },
                    })}
                />

                <Input
                    label='Slug :'
                    placeholder="Enter your slug"
                    className="mb-4"
                    {...register("slug" , {
                        required:{
                            value:true ,
                            message: 'Slug is required'
                        },
                    })}
                    onInput = {(e) => {
                        setValue('slug' , slugTransform(e.currentTarget.value), {
                            shouldValidate:true
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

            <div className='w-1/3 px-2'>
                <Input
                    label='Featured Image :'
                    type="file"
                    className='mb-4'
                    accept='image/jpg , image/png , image/jpeg , image/gif , image/bmp'
                    {...register("image" , {
                        require: !post,
                    })}
                />

                {post && (
                    <div className='w-full mb-4'>
                        <img 
                            src={fileService.getFilePreview(post.featuredImage)} 
                            alt={post.title}
                            className='rounded-lg'
                        />
                    </div>
                )}

                <Select
                    opations = {['active' , 'inactive']}
                    label = 'Status :'
                    className = 'mb-4'
                    {...register('status' , {
                        required:{
                            value:true ,
                            message: 'Status is required'
                        }
                    })}
                />

                <Button 
                    type='submit'
                    bgColor={post ? 'bg-green-500' : 'bg-blue-500'}
                    classname='w-full'
                >
                    {post ? 'Update Post' : 'Create Post'}
                </Button>

            </div>
        </form>
    )
}

export default PostForm