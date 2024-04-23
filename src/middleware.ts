export { default } from "next-auth/middleware"
export const config = {
    matcher: ["/mypage", "/api"],
}

// ここでロールによる振り分けもできる
// https://zenn.dev/tfutada/articles/5557b780050574#%E3%83%9F%E3%83%89%E3%83%AB%E3%82%A6%E3%82%A7%E3%82%A2