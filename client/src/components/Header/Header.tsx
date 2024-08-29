// Por convención, los nombres de componentes de React usan PascalCase
export default function Header() {
    return (
        <header className="flex flex-row border-2 border-neutral-300 w-full items-center justify-between">
            <div className="flex flex-row items-center">
                <p className="bg-neutral-400 rounded-full text-xl mx-8 p-2 my-2">Logo</p>
                <p className="text-2xl">PawPal Community</p>
            </div>
            <div className="flex flex-row items-center">
                <p className="bg-neutral-400 rounded-full text-xl mr-4 p-2 my-2">Foto</p>
                <p className="text-2xl mr-3">Nombre de usuario</p>
                <button>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="icon icon-tabler icons-tabler-filled icon-tabler-triangle-inverted h-4 w-4 mr-8">
                        <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                        />
                        <path
                            d="M20.118 3h-16.225a2.914 2.914 0 0 0 -2.503 4.371l8.116 13.549a2.917 2.917 0 0 0 4.987 .005l8.11 -13.539a2.914 2.914 0 0 0 -2.486 -4.386z" />
                    </svg>
                </button>
            </div>
        </header>
    )
}