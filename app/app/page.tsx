import FeatureSection from "@/components/landing/FeatureSection";
import { Footer } from "@/components/landing/Footer";
import { HiSection } from "@/components/landing/hiSection";
import { Navbar } from "@/components/landing/Navbar";
import { authoptions, CustomSession } from "@/lib/actions/auth";
import { getServerSession } from "next-auth";


export default async  function Home() {
  const session : CustomSession | null = await getServerSession(authoptions);
  return (
    <div className="min-h-screen flex flex-col ">
      
      <Navbar user ={session?.user  ?? null} />
     <HiSection/>
     <FeatureSection/>
     <Footer/>
     
     
     
    </div>
  );
}
