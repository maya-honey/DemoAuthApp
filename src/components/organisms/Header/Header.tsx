import Link from "next/link";

export default function Header() {
    return (
        <header className="flex justify-between">
            <div className="text-2xl"><Link href='/'>demo app</Link></div>
            <div className="flex gap-2">
                <Link
                    href='/signup'
                    className="flex h-[48px] items-center justify-center rounded-md bg-gray-100 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
                >新規登録</Link>
                <Link
                    href='/signin'
                    className="flex h-[48px] items-center justify-center rounded-md bg-gray-100 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
                >ログイン</Link>
            </div>
        </header>
    )
}