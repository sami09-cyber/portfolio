// import { createSharedPathnamesNavigation } from "next-intl/navigation"
// import { getRequestConfig } from "next-intl/server"
// import { notFound } from "next/navigation"
//
// export const locales = ["en", "fr"] as const
//     export type Locale = (typeof locales)[number]
//
// export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({ locales })
//
// export default getRequestConfig(async ({ locale }) => {
//     if (!locales.includes(locale as any)) notFound()
//
//     return {
//         messages: (await import(`./locales/${locale}.json`)).default,
//     }
// })
//
