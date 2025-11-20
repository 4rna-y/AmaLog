export interface IBlogModel {
    id: string;
    category: string;
    tag: string[];
    coverImgId: string;
    status: string;
    title: string;
    content: string;
    views: number;
    likes: number;
    createdAt: string;
    updatedAt: string;
    blogUpdate: IBlogUpdate[]
}

export interface IBlogUpdate {
    id: string;
    blogid: string;
    title: string;
    createdAt: string;
    contents: IBlogUpdateContent[]
}

export interface IBlogUpdateContent {
    id: string;
    blogUpdateId: string;
    type: string;
    line: number;
    before: string;
    after: string;
}

export interface IBlogThumbnailModel {
    id: string;
    category: string;
    tag: string[];
    coverImgId: string;
    status: string;
    title: string;
    createdAt: string;
    updatedAt: string;
}

export interface IBlogThumbnailCollection {
    amount: number,
    blogs: IBlogThumbnailModel[]
}
