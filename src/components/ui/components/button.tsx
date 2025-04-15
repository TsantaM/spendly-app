"use client"

import Link from 'next/link';
import '../style/button.css'
import { buttonProps, LinkType } from '@/src/types/ui_type'

export function Button({ content, event, variant = "primary" }: buttonProps) {
    return (
        <button onClick={event} className={`button ${variant}`}>{content}</button>
    )

}

export function CustomLink({ href, content, variant = "primary" }: LinkType) {
    return (
        <Link href={href} className={`button ${variant}`}>{content}</Link>
    )
}