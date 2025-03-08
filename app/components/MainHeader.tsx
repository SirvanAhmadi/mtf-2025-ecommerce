import { IoPerson } from "react-icons/io5"
import { PiTote } from "react-icons/pi"
import { Form, Link } from "react-router"
import SubNavbar from "./SubNavbar"

const MainHeader = () => {
  return (
    <header>
            <section className="flex py-5 bg-rose">
                <div className="w-1/4">
                    <Link to={"/"} className="text-2xl flex items-center justify-center text-outer-space font-bold" style={{
                        letterSpacing:"5px"
                    }}>
                        Rosa
                    </Link>
                </div>
                <div className="w-2/4">
                    <Form className="w-full">
                    <label className="input border-light-pink rounded-xl w-full" style={{
                        outline:0
                    }}>
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                            <input type="text" required placeholder="Search"/>
                        </label>
                    </Form>
                </div>
                <div className="w-1/4 flex justify-center items-center gap-3">
                    <span className="text-2xl text-dark-pink">
                        <PiTote />
                    </span>
                    <span className="text-2xl text-dark-pink">
                        <IoPerson />
                    </span>
                </div>
            </section>
            <SubNavbar />
    </header>
  )
}

export default MainHeader