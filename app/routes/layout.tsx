
import { Outlet } from "react-router";
import { BASE_URL_API, fetchWithRetry } from "~/apiClient";
import MainHeader from "~/components/MainHeader";
import type { Category } from "~/types/Category";


export async function loader():Promise<{cateData:Category[]}>{

    const cateRes = await fetchWithRetry(BASE_URL_API + "/categories");

    const cateData = await cateRes.json()

    return {
        cateData
    }
}

const Layout = () => {
  return (
    <section>
        <MainHeader />
        <main>
            <Outlet />
        </main>
    </section>
  )
}

export default Layout