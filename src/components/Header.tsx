
import { TiWeatherWindyCloudy } from "react-icons/ti";

const Header = () => {
  return (
    <header className="flex z-10 fixed top-0 left-0 w-full items-center h-22 bg-[#ffffff] px-6 gap-4">
        <div className="flex items-center gap-3 ">
          <TiWeatherWindyCloudy size={18} style={{color: "#357B9A"}} />
          <span className="font-medium" style={{color: "#213B4A"}}>Aether</span>
        </div>
    </header>
  )
}

export default Header