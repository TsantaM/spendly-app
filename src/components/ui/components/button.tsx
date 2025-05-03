"use client"

import '../style/button.css'
import { buttonProps } from '@/src/types/ui_type'

export function Button({ content, event, variant = "primary", state, otherclass }: buttonProps) {
    return (
        <button onClick={event} className={`button ${variant} ${state} ${otherclass ? otherclass : ''}`}>{content}</button>
    )

}