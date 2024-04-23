import { getServerSession } from "next-auth"

export default async function MyPage() {
    const session = await getServerSession()
    console.log(session)
    return (
        <div>
            <h2>Mypage</h2>
            <div>
                <p>session情報（サーバーサイドでセッション取得）</p>
                <div>
                    {JSON.stringify(session, null, 2)}
                </div>
            </div>
        </div>
    )
}