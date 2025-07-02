import React, { useEffect, useState } from 'react'
import databaseService from '../appwrite/database.service'
import { Container, PostCard } from '../components'
import Loading from '../components/loader/Loading'


const AllPost = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true);
        databaseService.getPosts([])
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                }
            })
            .catch((err) => {
                console.log("All Post :: Error ::", err);
            })
            .finally(() => setLoading(false));
    }, []);

    return !loading ? (posts && posts.length > 0 ? (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap -mx-2'>
                    {posts.map((post) => (
                        <div
                            key={post.$id}
                            className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'
                        >
                            <PostCard post={post} featuredImage={post["featured-Image"]} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    ) : (
        <>No Post is Available</>
    )) : (<Loading />)
}

export default AllPost