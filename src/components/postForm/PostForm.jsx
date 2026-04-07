import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index.js";
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
    const userData = useSelector((state) => state.auth.userData);

    // const submit = async (data) => {
        
    //     if (post) {
    //         const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

    //         if (file) {
    //             appwriteService.deleteFile(post.featuredimage);
    //         }

    //         const dbPost = await appwriteService.updatePost(post.$id, {
    //             ...data,
    //             featuredimage: file ? file.$id : undefined,
    //         });

    //         if (dbPost) {
    //             navigate(`/post/${dbPost.$id}`);
    //         }
    //     } else {
    //         // update kiya hai 
    //         // const file = await appwriteService.uploadFile(data.image[0]);

    //         const file = data.image?.[0]
    //             ? await appwriteService.uploadFile(data.image[0])
    //             : null;

    //         if (file) {
    //             const fileId = file.$id;
    //             data.featuredimage = fileId;
    //             const dbPost = await appwriteService.createPost({ ...data, userID: userData.$id });

    //             if (dbPost) {
    //                 navigate(`/post/${dbPost.$id}`);
    //             }
    //         }
    //     }
    // };





    const submit = async (data) => {
        try {
            if (!userData) {
                alert("User not logged in");
                return;
            }

            //  UPDATE POST
            if (post) {
                const file = data.image?.[0]
                    ? await appwriteService.uploadFile(data.image[0])
                    : null;

                if (file) {
                    await appwriteService.deleteFile(post.featuredimage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredimage: file ? file.$id : post.featuredimage,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }

            } else {
                //  CREATE POST

                //  IMAGE REQUIRED CHECK
                if (!data.image || !data.image[0]) {
                    alert("Please upload an image");
                    return;
                }

                const file = await appwriteService.uploadFile(data.image[0]);

                if (!file) {
                    alert("Image upload failed");
                    return;
                }

                const dbPost = await appwriteService.createPost({
                    title: data.title,
                    slug: data.slug,
                    content: data.content,
                    status: data.status,
                    featuredimage: file.$id,
                    userID: userData.$id,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                } else {
                    alert("Post creation failed");
                }
            }

        } catch (error) {
            console.error("Post submit error:", error);
            alert(error.message || "Something went wrong");
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
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap gap-5 md:gap-0  ">
            <div className="w-full lg:w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-full lg:w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredimage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                {/* <Button type="submit" bgColor={post ? 'bg-green-500' : undefined} className="w-full">{post ? 'update' : 'submit'}</Button> */}
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

