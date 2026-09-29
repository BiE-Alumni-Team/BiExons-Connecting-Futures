import AlumniCommunityStrip from "@/components/header/AlumniCommunityStrip";
import Banner from "@/components/header/Banner";
import BioinformaticsIntro from "@/components/header/BioinformaticsIntro";
import LoginSuccess from "@/components/others/LoginSuccess";



export default function Home() {
  return (
    <div className="bg-linear-to-r from-green-200 via-green-100 to-emerald-50">

      <Banner />

      <BioinformaticsIntro />
      <AlumniCommunityStrip />

      <main>

      </main>

    </div>
  );
}
