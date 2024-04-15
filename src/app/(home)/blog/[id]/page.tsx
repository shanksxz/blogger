import { getPost } from "~/actions/posts";
import Image from "next/image";
// import Delete from "@/components/del";
// import { getServerSession } from "next-auth";


export default async function Page({ params }: { params: { id: string } }) {

    const post = await getPost(params.id);

    if (post.status !== 200) {
        return (
            <div>Post not found</div>
        )
    }

    return (
        <section className="p-5">
            <div className="bg-background_secondary">
                <img src={post.post?.img as string} className='mx-auto' alt="" />
                <p className="mt-2">{post.post?.createdAt.toDateString()}</p>
                <h1 className="text-[3rem]">{post?.post?.title}</h1>
                <div className="mt-2" dangerouslySetInnerHTML={{ __html: post.post?.description || '<h1> Error! </h1>' }}></div>
            </div>
        </section>
    )

}