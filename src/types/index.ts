export type BlogProp = {
    id: string;
    title: string;
    description: string;
    authorEmail: string;
    createdAt: Date;
    updatedAt?: Date;
    img: string | null;
};

export type FormProps = {
    title: string,
    description: string
    file: FileList
}