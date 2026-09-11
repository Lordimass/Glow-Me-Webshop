"use client"

import {ProductCollection, ProductData} from "@/lib";
import {trackViewItemListAutoConvert} from "@/lib/ga/helpers.ts";
import {useContext, useEffect, useRef} from "react";
import {LocaleContext} from "@/lib/context/locale.tsx";

export default function Client({tag, serialisedGroups}: {tag: string, serialisedGroups: string}) {
    const {currency} = useContext(LocaleContext)
    const groups = ProductCollection.deserialise(serialisedGroups)
    const analyticsTracked = useRef(false)

    useEffect(() => {
        if (analyticsTracked.current) return;

        const representatives = groups.map((group) => group instanceof ProductData
            ? group
            : group.products[0]
        );

        trackViewItemListAutoConvert(
            currency,
            representatives,
            tag + "-items",
            `Items tagged "${tag}"`,
        );
        analyticsTracked.current = true;
    }, []);


    return null;
}