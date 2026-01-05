import { Navbar1 } from "@/components/ui/navbar-1"

export default function DemoPage() {
    return (
        <div className="min-h-screen bg-zinc-50 flex flex-col items-center pt-20">
            <h1 className="text-2xl font-bold mb-8">Navbar1 Demo</h1>
            <Navbar1 />
            <div className="mt-20 p-8 max-w-2xl text-center text-zinc-500">
                <p>This is a demonstration of the integrated Navbar1 component using motion/react and lucide-react.</p>
            </div>
        </div>
    )
}
