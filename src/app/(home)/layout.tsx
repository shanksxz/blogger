import NavBar from "~/components/Navbar";
import Footer from "~/components/footer";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="max-w-5xl mx-auto flex flex-col min-h-screen">
            <NavBar />
            <main className='flex-1'>
                {children}
            </main>
            <Footer />
        </div>
    )

}

