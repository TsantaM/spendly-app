import { LinkType } from "@/src/types/ui_type";
import Link from "next/link";
import '../style/button.css'

export function CustomLink({ href, content, variant = "primary" }: LinkType) {
    return (
        <Link href={href} className={`button ${variant}`}>{content}</Link>
    )
}