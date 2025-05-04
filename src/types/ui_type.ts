    
type ButtonVariant = "primary" | "secondary" | 'destructive' | 'ghost' | 'hover'
type State = "hover"

export type buttonProps = {
    content: string | React.ReactNode,
    event?: React.MouseEventHandler<HTMLButtonElement>,
    variant?: ButtonVariant,
    state?: State,
    otherclass?: string
}


export type LinkType = {
        href: string,
        content: string,
        variant?: ButtonVariant
        state?: State
}