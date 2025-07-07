'use client'

import {useEffect, useState} from 'react'
import {EditIcon, EyeIcon, FileTextIcon, MenuIcon, SplitIcon} from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function Editor({note, onNoteUpdate, onToggleSidebar, isSidebarOpen}) {
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const [viewMode, setViewMode] = useState('split') // 'edit', 'preview', 'split'

    useEffect(() => {
        if (note) {
            setContent(note.content)
            setTitle(note.title)
        }
    }, [note])

    const handleContentChange = (e) => {
        const newContent = e.target.value
        setContent(newContent)

        if (note) {
            onNoteUpdate(note.id, {content: newContent})
        }
    }

    const handleTitleChange = (e) => {
        const newTitle = e.target.value || 'Untitled Note'
        setTitle(newTitle)

        if (note) {
            onNoteUpdate(note.id, {title: newTitle})
        }
    }

    if (!note) {
        return (
            <div className="flex-1 flex items-center justify-center bg-gray-900">
                <div className="text-center">
                    <FileTextIcon size={48} className="text-gray-600 mx-auto mb-4"/>
                    <p className="text-gray-400 text-lg">Select a note to start editing</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full bg-gray-900">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800">
                <div className="flex items-center space-x-3">
                    <button
                        onClick={onToggleSidebar}
                        className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
                        title="Toggle Sidebar"
                    >
                        <MenuIcon size={18}/>
                    </button>
                    <input
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        className="text-lg font-semibold bg-transparent border-none outline-none text-gray-100 placeholder-gray-400 min-w-0 flex-1"
                        placeholder="Note title..."
                    />
                </div>

                <div className="flex items-center space-x-1 bg-gray-700 rounded-lg p-1">
                    <button
                        onClick={() => setViewMode('edit')}
                        className={`p-2 rounded-md transition-colors ${
                            viewMode === 'edit' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-200'
                        }`}
                        title="Edit Mode"
                    >
                        <EditIcon size={16}/>
                    </button>
                    <button
                        onClick={() => setViewMode('split')}
                        className={`p-2 rounded-md transition-colors ${
                            viewMode === 'split' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-200'
                        }`}
                        title="Split Mode"
                    >
                        <SplitIcon size={16}/>
                    </button>
                    <button
                        onClick={() => setViewMode('preview')}
                        className={`p-2 rounded-md transition-colors ${
                            viewMode === 'preview' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-200'
                        }`}
                        title="Preview Mode"
                    >
                        <EyeIcon size={16}/>
                    </button>
                </div>
            </div>

            {/* Editor Content */}
            <div className="flex-1 flex min-h-0">
                {/* Editor Panel */}
                {(viewMode === 'edit' || viewMode === 'split') && (
                    <div className={`${viewMode === 'split' ? 'w-1/2' : 'w-full'} flex flex-col`}>
            <textarea
                value={content}
                onChange={handleContentChange}
                className="flex-1 p-4 bg-editor-bg text-gray-100 border-none outline-none resize-none font-mono text-sm leading-relaxed"
                placeholder="Start writing your markdown here..."
                style={{minHeight: '100%'}}
            />
                    </div>
                )}

                {/* Preview Panel */}
                {(viewMode === 'preview' || viewMode === 'split') && (
                    <div
                        className={`${viewMode === 'split' ? 'w-1/2 border-l border-gray-700' : 'w-full'} overflow-y-auto`}>
                        <div className="p-4 markdown-body">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {content || '*No content to preview*'}
                            </ReactMarkdown>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}