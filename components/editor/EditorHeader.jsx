import {EditIcon, EyeIcon, SplitIcon} from "lucide-react";
import SidebarTogglerBtn from "@/components/ui/SidebarTogglerBtn";

export default function EditorHeader({handleTitleChange, title, onToggleSidebar, viewMode, setViewMode}) {
    return (
        <div className={`flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800`}>
            <div className={`flex items-center space-x-3`}>
                <SidebarTogglerBtn onToggleSidebar={onToggleSidebar}/>

                <input
                    type={`text`}
                    value={title}
                    onChange={handleTitleChange}
                    className={`text-lg font-semibold bg-transparent border-none outline-none text-gray-100 placeholder-gray-400 min-w-0 flex-1`}
                    placeholder={`Note title...`}
                />
            </div>

            <div className={`flex items-center space-x-1 bg-gray-700 rounded-lg p-1`}>
                <button
                    onClick={() => setViewMode('edit')}
                    className={`p-2 rounded-md transition-colors ${viewMode === 'edit' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-200'}`}
                    title={`Edit Mode`}
                >
                    <EditIcon size={16}/>
                </button>

                <button
                    onClick={() => setViewMode('split')}
                    className={`p-2 rounded-md transition-colors ${viewMode === 'split' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-200'}`}
                    title={`Split Mode`}
                >
                    <SplitIcon size={16}/>
                </button>

                <button
                    onClick={() => setViewMode('preview')}
                    className={`p-2 rounded-md transition-colors ${viewMode === 'preview' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-200'}`}
                    title={`Preview Mode`}
                >
                    <EyeIcon size={16}/>
                </button>
            </div>
        </div>
    )
}