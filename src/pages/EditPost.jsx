import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components/index'
import databaseService from '../appwrite/database.service'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../components/loader/Loading'

const EditPost = () => {
    const [post, setPost] = useState({})
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            databaseService.getPost(slug)
            .then((post) => {
                if (post) {
                    setPost(post)
                }
            })
        }else{
            navigate('/')
        }
    }, [slug , navigate])
    

    return post ? (
        <div className='py-8' >
            <Container>
                <PostForm post={post}/>
            </Container>
        </div>
    ) : <Loading/>
}

export default EditPost