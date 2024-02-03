import { useState } from "react"
import Header from "./header"
import GetProd from "./GetProd"
import GetReportes from "./GetReportes";
import GetReportePorProveedor from "./GetPorProveedor";
import 'tailwindcss/tailwind.css';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <div className="grid">

        <div>
          <div className="flex text-center justify-center mt-10">
            <GetProd />
          </div>

          <div className="flex text-center justify-center mt-10">
            <GetReportes />
          </div>

          <div className="flex text-center justify-center mt-10 mb-10">
            <GetReportePorProveedor />
          </div>
        </div>
      </div>
    </>

  )
}

export default App
