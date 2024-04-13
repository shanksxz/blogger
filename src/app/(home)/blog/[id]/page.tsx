import { getPost } from "~/actions/posts";
import Image from "next/image";
// import Delete from "@/components/del";
// import { getServerSession } from "next-auth";


export default async function Page({ params }: { params: { id: string } }) {

    const post = await getPost(params.id);

    if (!post) {
        return {
            notFound: true
        }
    }

    return (
        <div className="p-5 bg-background_secondary">
            <h1 className="text-[2rem]">{post?.post?.title}</h1>
            {/* <Image
                src={post.post?.img as string}
                width={200}
                height={200}
                alt=""
                className='float-left'
                // className="rounded-sm w-full h-[200px] object-cover"
            /> */}
            <div dangerouslySetInnerHTML={{ __html: post.post?.description as string }}></div>
        </div>
    )

}