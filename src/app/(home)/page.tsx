import { getAllBlogs } from "~/actions/posts";
import { Blogs } from "~/components/blog-card";


export default async function Page() {

    const posts = await getAllBlogs();

    return (
        <section className="grid grid-cols-1 md:grid-cols-3">
            {posts.post?.map((ele) => (
                <Blogs explore key={ele.id} posts={ele} />
            ))}
        </section>
    )
}