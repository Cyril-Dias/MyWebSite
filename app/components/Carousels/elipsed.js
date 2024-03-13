'use client'

import Image from "next/image";

export default function Elipsed({ img, photographer, alt }) {

    return (
        <>
            <Image
            alt={alt}
            src={img}
            width={300}
            height={300}
            className="object-cover rounded-3xl"
            />
            <p>{photographer}</p>
        </>
    );
  }
  