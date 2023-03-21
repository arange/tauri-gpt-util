type ButtonVariant = 'primary'
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    variant?: ButtonVariant
}

const variantClassNames: Record<ButtonVariant, string> = {
    primary: 'bg-green-500 text-white hover:bg-green-600'
}

export default function Button({variant = 'primary', className, ...rest}: ButtonProps) {
    const variantClassName = variantClassNames[variant]
    return (<button {...rest} className={`px-2 py-1 rounded ${variantClassName} ${className ?? ''}`}></button>)
}