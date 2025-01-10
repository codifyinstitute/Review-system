import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/react.svg'

function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();

  const closeSidebar = () => {
    if (window.innerWidth < 1024) { // 1024px is the lg breakpoint
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-30
        transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 transition-transform duration-300 ease-in-out
        w-64 bg-gray-800 text-white
      `}>
        <div className="p-4">
          <div className='flex justify-between mb-8 items-center'><img src={logo} alt="LOGO" className='w-12 aspect-square rounded-full'/><h1 className="text-xl font-bold">Review Manager</h1></div>
          <nav className="space-y-2">
            <Link
              to="/add"
              onClick={closeSidebar}
              className={`block p-3 rounded ${
                location.pathname === '/add'
                  ? 'bg-blue-600'
                  : 'hover:bg-gray-700'
              }`}
            >
              Add Business
            </Link>
            <Link
              to="/edit"
              onClick={closeSidebar}
              className={`block p-3 rounded ${
                location.pathname === '/edit'
                  ? 'bg-blue-600'
                  : 'hover:bg-gray-700'
              }`}
            >
              Edit Business
            </Link>
            <Link
              to="/login"
              onClick={closeSidebar}
              className={`block p-3 rounded ${
                location.pathname === '/login'
                  ? 'bg-blue-600'
                  : 'hover:bg-gray-700'
              }`}
            >
              Login/Logout
            </Link>
            <Link
              to="/Register"
              onClick={closeSidebar}
              className={`block p-3 rounded ${
                location.pathname === '/Register'
                  ? 'bg-blue-600'
                  : 'hover:bg-gray-700'
              }`}
            >
              Register
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Sidebar;