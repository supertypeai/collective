import Link from "next/link";
import { Mainframe } from "@/blocks/Mainframe";

const Page = () => {
    return (
        <Mainframe>
            <div className="flex flex-col items-center justify-center h-full min-h-screen">
                <h1 className="text-4xl font-bold">Coming Soon</h1>
                <p className="text-lg">This page doesn&apos;t yet exist. We are hard at work to get this live.</p>
                <p className="text-lg">In the meantime, you can check out our &nbsp;
                    <Link href="https://supertype.ai" className="link link-info" target="_blank"
                        rel="noreferrer noopener">website</Link> or &nbsp;
                    <Link href="https://www.linkedin.com/company/supertype-ai/" className="link link-info" target="_blank"
                        rel="noreferrer noopener">LinkedIn</Link>.</p>
            </div>
        </Mainframe>
    );
}

export default Page