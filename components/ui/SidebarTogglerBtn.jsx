import {MenuIcon} from "lucide-react";

export default function SidebarTogglerBtn({onToggleSidebar}) {
    return (
        <button
            onClick={onToggleSidebar}
            className={`p-2 rounded-lg hover:bg-gray-700 transition-colors`}
            title={`Toggle Sidebar`}
        >
            <MenuIcon size={18} />
        </button>
    )
}