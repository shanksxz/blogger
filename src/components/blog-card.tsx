import Link from "next/link";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";
import Image from "next/image";
import { BlogProp } from "~/types";

export async function Blogs({ posts, explore }: { posts: BlogProp; explore?: boolean }) {

    return (
        <Card className="rounded-sm p-0">
            {posts.img !== null && (
                <Image
                    src={posts.img}
                    alt=""
                    width={500}
                    height={200}
                    className="rounded-sm w-full h-[200px] object-cover"
                />
            )}
            <CardHeader className="">
                <p>{posts?.createdAt.toDateString()}</p>
                <CardTitle>
                    <Link href={`/blog/${posts?.id}`}>
                        <h1 className="">{posts.title}</h1>
                    </Link>
                </CardTitle>
                <div className="mt-2 line-clamp-3 text-sm/relaxed" dangerouslySetInnerHTML={{ __html: posts.description }} ></div>
            </CardHeader>
        </Card>
    );
}