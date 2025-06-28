import React, { useEffect, useState } from 'react'
import databaseService from '../appwrite/database.service'
import { Container, PostCard } from '../components'
import Loading from '../components/loader/Loading'


const AllPost = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    databaseService.getPosts([])
    .then((posts)=>{
        if (posts) {
            setPosts(posts.documents)
        }
    })
    .catch((err)=>{
        console.log("All Post :: Error ::" , err)
    })

    return posts ? (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => {
                        <div key={post.$id} className='p-4 w-1/4'>
                            <PostCard post={post} />
                        </div>
                    })}
                </div>
            </Container>
        </div>
    ) : (
        <Loading/>
    )
}

export default AllPost