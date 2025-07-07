'use client'

import {FileTextIcon, PlusIcon} from "lucide-react";
import {SITE_INFO} from "@/data/constants";
import SidebarTogglerBtn from "@/components/ui/SidebarTogglerBtn";

export default function EmptyNoteState({onToggleSidebar, onNoteCreate}) {
    return (
        <div className={`flex flex-col flex-1`}>
            <header className={`flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800`}>
                <div className={`flex items-center space-x-3`}>
                    <SidebarTogglerBtn onToggleSidebar={onToggleSidebar}/>
                    <h1 className={`text-xl font-semibold text-gray-100`}>{SITE_INFO.title}</h1>
                </div>
            </header>

            <div className={`h-full flex-1 flex items-center justify-center bg-gray-900`}>
                <div className={`text-center`}>
                    <FileTextIcon size={48} className={`text-gray-600 mx-auto mb-4`}/>
                    <p className={`text-gray-400 text-lg`}>Select a note to start editing</p>
                </div>
            </div>

            <div className={`absolute right-6 bottom-6`}>
                <button
                    onClick={onNoteCreate}
                    className={`p-2 rounded-lg w-fit bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-2`}
                    title={`New Note`}
                >
                    <PlusIcon size={18} /> New Note
                </button>
            </div>
        </div>
    )
}