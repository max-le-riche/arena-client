export type Classes = "User" | "Block" | "Image" | "Text" | "Link" | 'Media' | "Attachment" | "Channel"

export interface Source {
    readonly url: string,
    readonly title: string | null,
    readonly provider: Provider
}

export interface Image {
    readonly filename: string,
    readonly content_type: string,
    readonly updated_at: string,
    readonly thumb: ImageSource,
    readonly square: ImageSource,
    readonly large: ImageSource,
    readonly display: ImageSource
    readonly original: ImageOringal
}

export interface ImageSource {
    url: string
}

export interface ImageOringal {
    readonly url: string,
    readonly file_size: number,
    readonly file_size_display: string
}

export interface Provider {
    readonly name: string,
    readonly url: string,
}

export interface User {
    readonly id: number,
    readonly slug: string,
    readonly username: string,
    readonly first_name: string,
    readonly last_name: string,
    readonly avatar: string,
    readonly avatar_image: {
        readonly thumb: string,
        readonly display: string
    },
    readonly channel_count: number,
    readonly following_count: number,
    readonly profile_id: number,
    readonly follower_count: string,
    readonly class: Extract<Classes, "User">,
    readonly initials: string,
}

export interface Block {
    readonly id: number,
    readonly title: string | null,
    readonly updated_at: string,
    readonly created_at: string,
    readonly state: string,
    readonly comment_count: number,
    readonly generated_title: string,
    readonly class: Extract<Classes, "Image" | "Text" | "Link" | "Media" | "Attachment">
    readonly base_class: Extract<Classes, "Block">,
    readonly content: string | null,
    readonly content_html: string | null,
    readonly description: string | null,
    readonly description_html: string | null,
    readonly source: Source,
    readonly image: Image,
    readonly user: User,
    readonly connections: Channel[]
}

export type UpdateBlockParams = Pick<Block, 'title' | 'description' | 'content' >

export interface NewBlock {
    type: "Text" | "Source"
    data: string
}

export type PaginatedParams = {
    per?: number,
    page?: number,
}

export type EntityKeys = 'users' | 'channels' | 'blocks' | 'contents'

export type PaginatedEntity<EntityKey extends EntityKeys, EntityValue, Class extends Classes, BaseClass extends Classes> = {
    [key in EntityKey]: EntityValue[]
} & PaginatedResponse<Class, BaseClass>

export interface PaginatedResponse<Class extends Classes, BaseClass extends Classes> {
    readonly length: number,
    readonly total_Pages: number,
    readonly current_page: number,
    readonly per: number,
    readonly base_class: Extract<Classes, BaseClass>,
    readonly class: Extract<Classes, Class>
}

export type ChannelStatus = 'public' | 'closed' | 'private'
export interface ChannelParams  {
    title: string,
    status?: ChannelStatus  
}

export interface Channel {
    readonly id: number,
    readonly title: string,
    readonly created_at: string,
    readonly updated_at: string,
    readonly added_to_at: string,
    readonly published: boolean,
    readonly open: boolean,
    readonly collaboration: boolean,
    readonly slug: string,
    readonly length: 3,
    readonly kind: string,
    readonly status: ChannelStatus,
    readonly user_id: number,
    readonly metadata: null,
    readonly share_link: string | null,
    readonly base_class: Extract<Classes, "Channel">
}