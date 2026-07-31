import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-10 md:py-16 bg-gray-50 min-h-screen">
            <Container>
                <div className="max-w-4xl mx-auto">

                    {/* Featured Image */}
                    <div className="relative mb-10 overflow-hidden rounded-2xl shadow-xl">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-64 md:h-96 lg:h-[500px] object-cover"
                        />

                        {isAuthor && (
                            <div className="absolute top-4 right-4 flex flex-col md:flex-row gap-3">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button
                                        bgColor="bg-green-500"
                                        className="px-5 py-2"
                                    >
                                        Edit
                                    </Button>
                                </Link>

                                <Button
                                    bgColor="bg-red-500"
                                    className="px-5 py-2"
                                    onClick={deletePost}
                                >
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Title */}
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-5xl font-bold leading-tight text-gray-900">
                            {post.title}
                        </h1>

                        <p className="mt-3 text-sm md:text-base text-gray-500">
                            Published on{" "}
                            {new Date(post.$createdAt).toLocaleDateString()}
                        </p>
                    </div>

                    {/* Content */}
                    <div className="bg-white rounded-2xl shadow-md p-6 md:p-10">
                        <div className="browser-css break-words leading-8 text-gray-800">
                            {parse(post.content)}
                        </div>
                    </div>

                </div>
            </Container>
        </div>
    ) : null;
}