'use client'

import { useState } from 'react'
import { PlusIcon, TrashIcon, FileTextIcon, MenuIcon, XIcon } from 'lucide-react'

export default function Sidebar({
                                    notes,
                                    activeNoteId,
                                    onNoteSelect,
                                    onNoteCreate,
                                    onNoteDelete,
                                    isOpen,
                                    onToggle
                                }) {
    const [searchTerm, setSearchTerm] = useState('')

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
        })
    }

    const getPreview = (content) => {
        return content
            .replace(/#{1,6}\s/g, '') // Remove markdown headers
            .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
            .replace(/\*(.*?)\*/g, '$1') // Remove italic
            .replace(/`(.*?)`/g, '$1') // Remove inline code
            .replace(/\n/g, ' ') // Replace newlines with spaces
            .trim()
            .substring(0, 60) + (content.length > 60 ? '...' : '')
    }

    return (
        <>
            {/* Mobile backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                    onClick={onToggle}
                />
            )}

            {/* Sidebar */}
            <div className={`
        fixed md:relative inset-y-0 left-0 z-30 w-80 bg-sidebar-bg border-r border-gray-700 
        flex flex-col transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${!isOpen ? 'md:w-0 md:border-0' : ''}
      `}>
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    <h1 className="text-xl font-semibold text-gray-100">Notes</h1>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={onNoteCreate}
                            className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors"
                            title="New Note"
                        >
                            <PlusIcon size={18} />
                        </button>
                        <button
                            onClick={onToggle}
                            className="p-2 rounded-lg hover:bg-gray-700 transition-colors md:hidden"
                            title="Close Sidebar"
                        >
                            <XIcon size={18} />
                        </button>
                    </div>
                </div>

                {/* Search */}
                <div className="p-4 border-b border-gray-700">
                    <input
                        type="text"
                        placeholder="Search notes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* Notes List */}
                <div className="flex-1 overflow-y-auto">
                    {filteredNotes.length === 0 ? (
                        <div className="p-4 text-center text-gray-400">
                            {searchTerm ? 'No matching notes found' : 'No notes yet'}
                        </div>
                    ) : (
                        filteredNotes.map((note) => (
                            <div
                                key={note.id}
                                className={`
                  p-4 border-b border-gray-700 cursor-pointer hover:bg-sidebar-item-hover 
                  transition-colors group relative
                  ${activeNoteId === note.id ? 'bg-sidebar-item-active' : ''}
                `}
                                onClick={() => onNoteSelect(note.id)}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center space-x-2 mb-1">
                                            <FileTextIcon size={16} className="text-gray-400 flex-shrink-0" />
                                            <h3 className="font-medium text-gray-100 truncate">
                                                {note.title}
                                            </h3>
                                        </div>
                                        <p className="text-sm text-gray-400 line-clamp-2 mb-2">
                                            {getPreview(note.content)}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {formatDate(note.updatedAt)}
                                        </p>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            onNoteDelete(note.id)
                                        }}
                                        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-600 transition-all ml-2"
                                        title="Delete Note"
                                    >
                                        <TrashIcon size={14} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    )
}