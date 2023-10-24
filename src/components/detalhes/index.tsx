import DetalhesMobile from "./DetalhesMobile";
import DetalhesWeb from "./DetalhesWeb";

  
  const DetViagem = () => {
    return(
    <div>
    {window.innerWidth <=600 ? (
    <DetalhesMobile />
    ) : (
    <DetalhesWeb />
    )}
    </div>
    )
  }
  
  export default DetViagem