"use client"
import { useForm, SubmitHandler } from "react-hook-form"
import { Input } from '~/components/ui/input'
import { Button } from "~/components/ui/button"
import { Label } from "~/components/ui/label"
import { useRouter } from "next/navigation"
import { createPost } from "~/actions/posts"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ChangeEvent, useState } from "react"
import { fileUpload } from "~/utils/index"
import { FormProps } from "~/types"
import { toast } from "sonner"

export default function Page() {

    const router = useRouter()

    const [file, setFile] = useState<File | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormProps>()
    const [value, setValue] = useState('')


    const onSubmit: SubmitHandler<FormProps> = async (data) => {
        try {
                const imgUrl = await fileUpload(data.file[0] as File)
                const response = await createPost(data.title, value, imgUrl)
                console.log(response)
                if (response.status === 201) {
                    toast.success('Sucessfully created the post, redirecting in 5sec')
                    setTimeout(() => {
                        router.push('/')
                    }, 3000)
                    return
                }
                toast.error('Error creating the post, please try again later')
                
            }
        catch (error) {
            console.error('Error submitting form:', error);
        }
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    return (
        <form className="rounded-md flex flex-col gap-10" onSubmit={handleSubmit(onSubmit)}>
            <Label className="flex flex-col gap-2 lg:w-1/3">
                Title
                <Input
                    type="text"
                    className="p-2"
                    placeholder="Enter title"
                    {...register("title", {
                        required: true,
                    })}
                />
                {errors.title && (
                    <p className="text-red-500">
                        title cannot be empty
                    </p>
                )}
            </Label>

            <Label className="flex flex-col gap-2">
                Img Upload?
                <Input
                    type="file"
                    placeholder=""
                    className="lg:w-2/3"
                    {...register("file", { onChange: handleFileChange, required : true })}
                />
            </Label>

            {file && <img src={URL.createObjectURL(file)} />}

            <ReactQuill value={value} onChange={setValue} />

            <Button className='lg:w-1/6' type="submit">
                Submit
            </Button>
        </form>
    )
}