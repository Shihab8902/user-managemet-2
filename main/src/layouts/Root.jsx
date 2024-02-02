import { Outlet } from "react-router-dom"

const Root = () => {
    return <main className="container ">

        {/* Render outlet */}
        <Outlet />


    </main>
}

export default Root