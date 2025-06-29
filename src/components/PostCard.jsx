import React from 'react'
import appwriteService from '../appwrite/database.service'
import fileService from '../appwrite/file.service'
import { Link } from 'react-router-dom'

const PostCard = ({
  post,
  featuredImage,
}) => {  
  const imageUrl = featuredImage ? fileService.getFilePreview(featuredImage) : "fallback-image-url-or-empty-string";
  
  return (
    <Link to={`/post/${post.$id}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
          <img src={imageUrl+"&mode=any"} alt={post.title} className='w-full h-48 object-contain rounded-xl ' />
        </div>
        <h2 className='text-xl font-semibold mb-2 text-center'>{post.title}</h2>
      </div>
    </Link>
  )
}

export default PostCard