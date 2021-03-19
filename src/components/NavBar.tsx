export default function NavBar({title}){
    return <nav className="w-full p-4 bg-white border-b border-gray-200">
        <h1 className="text-2xl font-header font-medium">
            {title}&nbsp;
        </h1>
    </nav>
}