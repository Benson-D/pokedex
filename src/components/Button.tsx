
interface ButtonProps {
    handler?: () => void;
    title: string | JSX.Element;
    className?: string;
}

/** Main Button Component */
function Button({ handler, title, className }: ButtonProps) {

  return (
    <button onClick={handler} 
            className={ 
                className || 'bg-red-200 py-2 px-6 hover:bg-red-400 rounded'}>
            {title}
    </button>
  )
}

export default Button;
