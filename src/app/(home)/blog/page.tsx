import { getPosts } from "~/actions/posts";
import { Blogs } from "~/components/blog-card";
import { BlogProp } from "~/types";

export default async function MyBlog() {

    const posts = await getPosts();

    return (
        <div
            className="grid grid-col-1 gap-5 md:grid-cols-3">
            {posts?.blogs?.map((post: BlogProp) => {
                return <Blogs key={post.id} posts={post} />
            })}
        </div>
    );

}