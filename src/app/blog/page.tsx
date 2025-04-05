// import { BlogHeader } from "@/components/blog-header"
// import { BlogList } from "@/components/blog-list"
// import type { Metadata } from "next"
//
// export const metadata: Metadata = {
//   title: "Blog | Portfolio Futuriste",
//   description: "Articles, tutoriels et réflexions sur le développement web et le design",
// }
//
// export default function BlogPage() {
//   return (
//     <main className="min-h-screen bg-background pt-20">
//       <BlogHeader />
//       <BlogList />
//     </main>
//   )
// }
//


import { BlogList } from "@/components/blog-list"
import type { Metadata } from "next"
import {Header} from "@/components/header";
import {Footer} from "@/components/footer";

export const metadata: Metadata = {
    title: "Blog | Portfolio",
    description: "Articles, tutoriels et réflexions sur le développement web, le design et les technologies émergentes",
}

export default function BlogPage() {
    return (
        <main>
            <Header />
            <BlogList />
            <Footer />
        </main>
    )
}

