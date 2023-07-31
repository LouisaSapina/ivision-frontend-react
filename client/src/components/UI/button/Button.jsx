import cl from './Button.module.css';

function Button({children, className, ...props}) {
    return (
        <button className={cl.button + " " + className} {...props}>{children}</button>
    );
}

export default Button;
