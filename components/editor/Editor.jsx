'use client'

import {useEffect, useState} from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import EmptyNoteState from "@/components/editor/EmptyNoteState";
import EditorHeader from "@/components/editor/EditorHeader";

export default function Editor({note, onNoteUpdate, onToggleSidebar, onNoteCreate, isSidebarOpen}) {
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
            <EmptyNoteState onToggleSidebar={onToggleSidebar} onNoteCreate={onNoteCreate}/>
        )
    }

    return (
        <div className={`flex flex-col h-full bg-gray-900`}>
            <EditorHeader handleTitleChange={handleTitleChange} title={title} onToggleSidebar={onToggleSidebar}
                          viewMode={viewMode} setViewMode={setViewMode}/>

            {/* Editor Content */}
            <div className={`flex-1 flex min-h-0`}>
                {/* Editor Panel */}
                {(viewMode === 'edit' || viewMode === 'split') && (
                    <div className={`${viewMode === 'split' ? 'w-1/2' : 'w-full'} flex flex-col`}>
                        <textarea
                            value={content}
                            onChange={handleContentChange}
                            className={`flex-1 p-4 bg-editor-bg text-gray-100 border-none outline-none resize-none font-mono text-sm leading-relaxed`}
                            placeholder={`Start writing your markdown here...`}
                            style={{minHeight: '100%'}}
                        />
                    </div>
                )}

                {/* Preview Panel */}
                {(viewMode === 'preview' || viewMode === 'split') && (
                    <div
                        className={`${viewMode === 'split' ? 'w-1/2 border-l border-gray-700' : 'w-full'} overflow-y-auto`}>
                        <div className={`p-4 markdown-body`}>
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