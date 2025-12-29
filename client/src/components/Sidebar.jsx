import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import MyTasksSidebar from './MyTasksSidebar'
import ProjectSidebar from './ProjectsSidebar'
import WorkspaceDropdown from './WorkspaceDropdown'
import { FolderOpenIcon, LayoutDashboardIcon, SettingsIcon, UsersIcon } from 'lucide-react'
import { useClerk } from '@clerk/clerk-react'

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {

    const {openUserProfile} = useClerk();

    const menuItems = [
        { name: 'Dashboard', href: '/', icon: LayoutDashboardIcon },
        { name: 'Projects', href: '/projects', icon: FolderOpenIcon },
        { name: 'Team', href: '/team', icon: UsersIcon },
    ]

    const sidebarRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsSidebarOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setIsSidebarOpen]);

    return (
        <div ref={sidebarRef} className={`z-10 sidebar-gradient backdrop-blur-md min-w-68 flex flex-col h-screen border-r border-gray-200 dark:border-zinc-800 max-sm:absolute transition-all ${isSidebarOpen ? 'left-0' : '-left-full'} opacity-95 dark:opacity-100`} >
            <WorkspaceDropdown />
            <hr className='border-gray-200 dark:border-zinc-800' />
            <div className='flex-1 overflow-y-scroll no-scrollbar flex flex-col'>
                <div>
                    <div className='p-4'>
                        {menuItems.map((item) => (
                            <NavLink to={item.href} key={item.name} className={({ isActive }) => `flex items-center gap-3 py-2 px-4 transition-all rounded text-sm ${isActive ? 'text-blue-600 dark:text-blue-400 nav-item-active font-medium' : 'text-gray-600 dark:text-zinc-400 hover:bg-gray-100/50 dark:hover:bg-zinc-800/50'}`} >
                                <item.icon size={18} />
                                <p className='truncate'>{item.name}</p>
                            </NavLink>
                        ))}
                        <button onClick={openUserProfile} className='flex w-full items-center gap-3 py-2 px-4 text-gray-600 dark:text-zinc-400 cursor-pointer rounded hover:bg-gray-100/50 dark:hover:bg-zinc-800/50 transition-all text-sm'>
                            <SettingsIcon size={18} />
                            <p className='truncate'>Settings</p>
                        </button>
                    </div>
                    <MyTasksSidebar />
                    <ProjectSidebar />
                </div>
            </div>

        </div>
    )
}

export default Sidebar
