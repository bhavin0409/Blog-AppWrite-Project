import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import databaseService from "../appwrite/database.service";
import fileUploadService from "../appwrite/file.service";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (slug) {
            databaseService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);
    
    const isAuthor = post && userData ? post.userID === userData.$id : false;

    const deletePost = () => {
        databaseService.deletePost(slug).then((status) => {
            if (status) {
                fileUploadService.deleteFile(post["featured-Image"]);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={fileUploadService.getFilePreview(post["featured-Image"]) + "&mode=admin"}
                        alt={post.title}
                        className="rounded-xl"
                    />
                </div>
                    {isAuthor && (
                        <div className="flex flex-row gap-4 justify-center">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button className="bg-green-500 px-6 py-2 duration-200 mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button className="bg-red-500 px-6 py-2 duration-200" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}