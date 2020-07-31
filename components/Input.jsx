export default function ({name, className = '', ...rest}) {
    if(typeof name !== 'string') throw new Error(`Input.name expected string but received ${typeof name}! `)

    return (
        <input
            {...rest}
            className={`${className} w-full px-3 py-2 m-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none`}
            name={name}
        />
    );
}
