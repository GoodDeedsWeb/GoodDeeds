export default function NavPanel() {
    return (
<nav className=" bg-gray-100 border-gray-200">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <span className="self-center text-2xl font-semibold whitespace-nowrap">Good deeds</span>
    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <button type="button" onClick={LogOutBtn} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center">
            Log out
        </button>
    </div>
  </div>
</nav>
    );
}

function LogOutBtn() {
    localStorage.removeItem('Bearer');
    window.location.href = "http://localhost:3000/auth?mode=login"
}