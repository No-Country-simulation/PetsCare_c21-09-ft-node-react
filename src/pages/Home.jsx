import BannerLogIn from "../components/BannerLogIn"
import ServiceCategories from "../components/ServiceCategories"

export default function Home() {
  return (
    <>
        <div className="container-home">
         
         <BannerLogIn />
         <ServiceCategories />
        </div>
    </>
  )
}
