import BannerLogIn from "../components/BannerLogIn"
import ServiceCategories from "../components/ServiceCategories"

export default function Home() {
  return (
    <>
        <div className="container-home  flex flex-col flex-grow min-h-screen">
         
         <BannerLogIn />
         <ServiceCategories />
        </div>

        
    </>
  )
}
