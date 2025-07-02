import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import databaseService from "../appwrite/database.service";
import fileUploadService from "../appwrite/file.service";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Loading from "../components/loader/Loading";

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
        <div className="py-8 min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
            <Container>
                <div className="relative flex flex-col items-center">
                    {/* Image Card */}
                    <div className="w-full max-w-3xl aspect-video rounded-3xl overflow-hidden shadow-2xl mb-8 group transition-transform duration-300 hover:scale-105 bg-white flex items-center justify-center mx-auto">
                        <img
                            src={fileUploadService.getFilePreview(post["featured-Image"])}
                            alt={post.title}
                            className="w-full h-full object-fill object-center transition-all duration-300 group-hover:brightness-90"
                            style={{ maxHeight: "320px" }}
                        />
                        {/* Title overlay for large screens */}
                        <div className="hidden lg:block absolute bottom-8 left-8 bg-black bg-opacity-60 px-6 py-3 rounded-xl">
                            <h1 className="text-3xl font-bold text-white">{post.title}</h1>
                        </div>
                    </div>
                    {/* Title for small screens */}
                    <div className="w-full mb-6 text-center py-2 lg:hidden">
                        <h1 className="text-2xl font-bold">{post.title}</h1>
                    </div>
                    {/* Author Controls */}
                    {isAuthor && (
                        <div className="flex flex-row gap-4 justify-center mb-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button className="bg-green-500 px-6 py-2 duration-200 hover:bg-green-600 shadow-md">
                                    Edit
                                </Button>
                            </Link>
                            <Button className="bg-red-500 px-6 py-2 duration-200 hover:bg-red-600 shadow-md" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                    {/* Content */}
                    <div className="browser-css w-full max-w-5xl mx-auto rounded-2xl shadow-lg p-2 sm:p-4 md:p-8  break-words overflow-x-auto">
                        {parse(post.content)}
                    </div>
                </div>
            </Container>
        </div>
    ) : (<Loading />);
}