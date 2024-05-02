import { sendVerificationRequest } from "@/actions/newVerification"
import { EmailConfig, SendVerificationRequestParams } from "next-auth/providers/email"

// nodemodules/next-auth/src/providers/email.ts
interface ResendConfig extends EmailConfig {
    apiKey: string
}

export const ResendProvider = (): ResendConfig => {
    return {
        id: 'user-resend',
        type: "email",
        name: "Email",
        apiKey: process.env.RESEND_API_KEY!,
        from: process.env.RESEND_FROM!,
        sendVerificationRequest: async ({ identifier: email, provider, url, theme, token }) => {
            return await sendVerificationRequest({ email, provider, url, theme, token })
        },
    }
}