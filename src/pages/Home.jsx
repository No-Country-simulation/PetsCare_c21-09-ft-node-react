import BannerLogIn from "../components/BannerLogIn"
import ServiceCategories from "../components/ServiceCategories"

export default function Home() {
  return (
    <>
        <div className="container-home">
         Home component, aca agregar los componentes que queremos que se vean al entrar al sitio
         <BannerLogIn />
         <ServiceCategories />
        </div>
    </>
  )
}
