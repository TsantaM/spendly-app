    
type ButtonVariant = "primary" | "secondary" | 'destructive' | 'ghost'

export type buttonProps = {
    content: string | React.ReactNode,
    event?: React.MouseEventHandler<HTMLButtonElement>,
    variant?: ButtonVariant
}


export type LinkType = {
        href: string,
        content: string,
        variant?: ButtonVariant
}