import { ButtonHTMLAttributes, ReactNode } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
}

export default function Button({
    children,
    ...props
}: ButtonProps) {
    return (
        <button
            className="bg-gray-200 p-2 rounded"
            {...props}
        >
            {children}
        </button>
    )
}