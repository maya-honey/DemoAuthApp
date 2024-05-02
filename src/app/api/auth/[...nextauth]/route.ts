import { fetchUserByEmail } from "@/lib/data";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import EmailProvider from "next-auth/providers/email"
import bcrypt from 'bcrypt'
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
const prisma = new PrismaClient()

// import CredentialsProvider from "next-auth/providers/credentials"
// https://next-auth.js.org/configuration/options
const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "example@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // 資格情報が有効であることを示すユーザー オブジェクトを返すと、
                // そのオブジェクトは JSON Web トークンに保持され、その後オブジェクトを拒否するカスタムのsignIn() コールバックが構成されていない限り、ユーザーはサインインします。
                // null を返すと、ユーザーに詳細を確認するよう促すエラーが表示されます。
                // エラーをスローすると、ユーザーはエラー メッセージをクエリ パラメータとして含むエラー ページに送信されます。
                try {
                    const user = await fetchUserByEmail(credentials.email)
                    if (! user) return null
                    
                    const isCorrectPassword = await bcrypt.compare(credentials.password, user.password)
                    if (! isCorrectPassword) return null

                    return user
                } catch(err) {

                    throw new Error('ログイン失敗')
                }
            }
        }),
        EmailProvider({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM,
            maxAge: 24 * 60 * 60,
        })
    ],
    callbacks: {
        // https://next-auth.js.org/configuration/callbacks
        // コールバックは、アクションの実行時に何が起こるかを制御するために使用できる非同期関数です。
        // コールバックは、データベースなしでアクセス制御を実装したり、外部データベースや API と統合したりできるため、特に JSON Web トークンが関係するシナリオで非常に強力です。
        // JSON Web トークンの使用時にアクセス トークンやユーザー ID などのデータを
        // ブラウザに渡したい場合は、jwt コールバックが呼び出されたときにデータを
        // トークンに保持し、セッション コールバックでデータをブラウザに渡すことができます
        async jwt({ token, user, account, profile }) {
            // https://next-auth.js.org/configuration/callbacks
            // JSON Web トークンが作成されるとき (つまり、サインイン時)、
            // または更新されるとき (つまり、クライアントでセッションがアクセスされるとき) 
            // に必ず呼び出されます
            // 戻り値は暗号化され、Cookie に保存されます。
            return token
        },
        async session({ session, token, user }) {
            // セッション コールバックは、セッションがチェックされるたびに呼び出されます。
            // デフォルトでは、セキュリティを強化するためにトークンのサブセットのみが返されます。
            //  jwt() コールバックを介してトークンに追加したもの (上記の access_token や user.id など) 
            // を利用可能にしたい場合は、それをここで明示的に転送して、クライアントが利用できるようにする必要があります。
            if (token) {
                session.user.email = token.email
                session.user.id = token.id
            }
            return session
        },
        async signIn({ user, account, profile, email, credentials }) {
            // コールバックを使用して、signIn()ユーザーにサインインを許可するかどうかを制御します。
            // 許可する場合はtrueを返す
            // デフォルトのエラーメッセージを表示するにはfalseを、あるいはリダイレクト先を指定することもできる
            return true
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/signin',
    },
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt',
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST}