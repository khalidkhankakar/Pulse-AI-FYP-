import {Footer} from "./_components/footer";
import {Navbar} from "./_components/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen relative overflow-x-hidden transition-colors duration-300">
        <Navbar />
   
        {children}
        <Footer />
    </div>
  );
}
