export interface TSISGProductData extends TSISGRawProductData {
    /** @DEPRECATED Please use `category.id` instead */
    category_id: number
    /** The category the product belongs to */
    category: TSISGCategoryData
    /** All images associated with this product */
    images: ImageData[]
    /** The tags attached to the product */
    tags: TSISGTagData[]
}

/** A product data record directly from Supabase, with no modifications made to it */
export interface TSISGRawProductData {
    /** The ID of this product */
    sku: number,
    /** Customer facing name of the product. Max 50 characters.*/
    name: string
    /** Price of product in GBP inc. Tax */
    price: number
    stock: number
    active: boolean
    /** Weight of the product in grams. */
    weight: number | null
    /** Additional information on the product */
    metadata: {
        /** The name of this specific variant, if `group_name != undefined` */
        variant_name?: string
        /** The priority of this product to search engines, used in sitemaps */
        seo_priority?: number
        [key: string]: unknown
    }
    /** Products with the same group name are displayed as one product with variants, instead of each as unique products. */
    group_name: string | null
    sort_order: number
    /** The ID of the category this product is in */
    category_id: number
    /** The user facing description of the product, supports markdown (*italics*, **bold**, (links)[URL], etc.) */
    description: string | null
    /** Time at which the product was added to the database as an ISO date string */
    inserted_at: string
    /** The time which this data was last edited as an ISO date string. */
    last_edited: string
    /** The ID of the last person to edit this product. */
    last_edited_by: string | null
    /** Short description for customs forms. Max length: 50 characters.*/
    customs_description: string | null
    /** The ISO 3166-1 alpha-3 country code of the country which this product had its final manufacturing stage in. e.g. "CHN" for "China" */
    origin_country_code: string | null
    /** For products which are too large to fit in smaller boxes, so require a specific minimum box size to send. */
    package_type_override: string | null
    /** An extended description for customs forms applicable to higher value orders. Max length: 300 characters. */
    extended_customs_description: string | null
    /** Additional information about the product which is displayed to the customer. Every key-value pair is shown as is. */
    customer_metadata: {[key: string]: any}
}

export type ImageData = {
    /** Alt text for the image */
    alt: string | null
    /** The identifier of the bucket that the image object belongs to */
    bucket_id: string
    /** The order to display this image in when in a list, higher numbers come later */
    display_order: number
    /** The identifier of the image object */
    id: string
    /** DEPRECATED: Use `id` instead. The direct access url of the image */
    image_url?: string
    /** ISO timestamp of when the association was made between the image and the product */
    inserted_at: string
    /** The filename of the image */
    name: string
    /** String tokens representing the path through the bucket to obtain the image */
    path_tokens: string[]
    /** The SKU of the product this image is related to */
    product_sku: number
    /** Additional information on the image object itself */
    metadata: { [key: string]: unknown }
    /** Additional information on the association between the image and its product. */
    association_metadata: TSISGAssociationMetadata
}

/** Additional information on the association between an image and its product. */
export type TSISGAssociationMetadata = {
    /**
     * Whether this image is relevant to all products in the product group
     * (if it exists), rather than just the SKU it's assigned to
     */
    global?: boolean | null

    /**
     * Whether this image is to be used as an icon for the product when
     *  in a group, rather than as a standard product image
     */
    group_product_icon?: boolean | null

    /**
     * Whether this image is used to represent the group as a whole, rather
     * than an individual variant.
     */
    group_representative?: boolean | null

    [key: string]: unknown
}

export type TSISGTagData = {
    name: string
    created_at: string
}

export type TSISGCategoryData = {
    id: number,
    created_at: string
    name: string,
    description: string | null,
}

/**
 * A product from the order_products table
 */
export interface TSISGOrderProduct {
    order_id?: string
    product_sku: number,
    quantity: number,
    value: number
}