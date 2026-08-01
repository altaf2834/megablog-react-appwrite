import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();

    const auth = useSelector((state) => state.auth);
    const userData = auth.userData;
    
    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="w-full">
            <div className="flex flex-col lg:flex-row gap-6">

                {/* ── Left Column: Content ─────────────────────── */}
                <div className="flex-1 min-w-0">
                    <div
                        className="rounded-xl border p-6 space-y-5"
                        style={{
                            backgroundColor: 'var(--bg-surface)',
                            borderColor: 'var(--border)',
                        }}
                    >
                        <div className="flex items-center gap-2 pb-4 border-b" style={{borderColor: 'var(--border)'}}>
                            <svg className="w-4 h-4" style={{color: 'var(--accent)'}} fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h8M4 10h5"/>
                            </svg>
                            <h2 className="text-sm font-semibold" style={{color: 'var(--text-primary)', fontFamily: "'Inter', sans-serif"}}>
                                Post Content
                            </h2>
                        </div>

                        <Input
                            label="Title"
                            placeholder="Give your post a compelling title..."
                            {...register("title", { required: true })}
                        />
                        <Input
                            label="Slug"
                            placeholder="post-url-slug"
                            {...register("slug", { required: true })}
                            onInput={(e) => {
                                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                            }}
                        />

                        <div>
                            <RTE label="Content" name="content" control={control} defaultValue={getValues("content")} />
                        </div>
                    </div>
                </div>

                {/* ── Right Column: Settings ───────────────────── */}
                <div className="w-full lg:w-80 flex-shrink-0">
                    <div
                        className="rounded-xl border p-6 space-y-5 lg:sticky lg:top-24"
                        style={{
                            backgroundColor: 'var(--bg-surface)',
                            borderColor: 'var(--border)',
                        }}
                    >
                        <div className="flex items-center gap-2 pb-4 border-b" style={{borderColor: 'var(--border)'}}>
                            <svg className="w-4 h-4" style={{color: 'var(--accent)'}} fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V7l-4-4z"/>
                            </svg>
                            <h2 className="text-sm font-semibold" style={{color: 'var(--text-primary)', fontFamily: "'Inter', sans-serif"}}>
                                Post Settings
                            </h2>
                        </div>

                        {/* Featured Image Upload */}
                        <div>
                            <label
                                className="block mb-1.5 text-sm font-medium"
                                style={{color: 'var(--text-muted)'}}
                            >
                                Featured Image
                            </label>
                            <div
                                className="relative rounded-lg border-2 border-dashed p-4 text-center cursor-pointer transition-colors duration-150"
                                style={{borderColor: 'var(--border)'}}
                                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                            >
                                <input
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    accept="image/png, image/jpg, image/jpeg, image/gif"
                                    {...register("image", { required: !post })}
                                />
                                <div className="pointer-events-none">
                                    <svg className="w-8 h-8 mx-auto mb-2" style={{color: 'var(--text-muted)'}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4-4 4 4 4-8 4 4M4 20h16"/>
                                    </svg>
                                    <p className="text-xs" style={{color: 'var(--text-muted)'}}>
                                        Click or drag to upload
                                    </p>
                                    <p className="text-xs mt-1" style={{color: 'var(--border-hover)'}}>
                                        PNG, JPG, GIF up to 10MB
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Current Image Preview */}
                        {post && (
                            <div className="space-y-2">
                                <p className="text-xs font-medium" style={{color: 'var(--text-muted)'}}>Current image</p>
                                <div className="rounded-lg overflow-hidden border" style={{borderColor: 'var(--border)'}}>
                                    <img
                                        src={appwriteService.getFilePreview(post.featuredImage)}
                                        alt={post.title}
                                        className="w-full object-cover"
                                        style={{maxHeight: '160px'}}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Status */}
                        <Select
                            options={["active", "inactive"]}
                            label="Status"
                            {...register("status", { required: true })}
                        />

                        {/* Submit */}
                        <Button
                            type="submit"
                            bgColor={post ? "bg-green-600" : "bg-indigo-600"}
                            className="w-full py-3 text-base"
                        >
                            {post ? (
                                <>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 4l1 1-6 6-2 1 1-2 6-6z"/>
                                    </svg>
                                    Update Post
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M8 3v10"/>
                                    </svg>
                                    Publish Post
                                </>
                            )}
                        </Button>
                    </div>
                </div>

            </div>
        </form>
    );
}