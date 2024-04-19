import NextAuth from "next-auth/next";

// https://next-auth.js.org/configuration/options
const handler = NextAuth({
    providers: [

    ]
})

export { handler as GET, handler as POST}