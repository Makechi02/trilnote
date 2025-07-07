'use client'

import {useState, useEffect} from 'react'
import Sidebar from './Sidebar'
import Editor from './Editor'
import {useLocalStorage} from '@/hooks/useLocalStorage'
import {generateId} from '@/utils/generateId'

export default function NotesApp() {
    const [notes, setNotes] = useLocalStorage('markdown-notes', [])
    const [activeNoteId, setActiveNoteId] = useState(null)
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    const activeNote = notes.find(note => note.id === activeNoteId)

    useEffect(() => {
        if (notes.length > 0 && !activeNoteId) {
            setActiveNoteId(notes[0].id)
        }
    }, [notes, activeNoteId])

    const createNote = () => {
        const newNote = {
            id: generateId(),
            title: 'Untitled Note',
            content: '# New Note\n\nStart writing your markdown here...',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
        setNotes(prev => [newNote, ...prev])
        setActiveNoteId(newNote.id)
    }

    const updateNote = (id, updates) => {
        setNotes(prev => prev.map(note =>
            note.id === id
                ? {...note, ...updates, updatedAt: new Date().toISOString()}
                : note
        ))
    }

    const deleteNote = (id) => {
        setNotes(prev => prev.filter(note => note.id !== id))
        if (activeNoteId === id) {
            const remainingNotes = notes.filter(note => note.id !== id)
            setActiveNoteId(remainingNotes.length > 0 ? remainingNotes[0].id : null)
        }
    }

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    return (
        <div className="flex h-screen bg-gray-900 text-gray-100">
            <Sidebar
                notes={notes}
                activeNoteId={activeNoteId}
                onNoteSelect={setActiveNoteId}
                onNoteCreate={createNote}
                onNoteDelete={deleteNote}
                isOpen={isSidebarOpen}
                onToggle={toggleSidebar}
            />

            <div className="flex-1 flex flex-col min-w-0">
                <Editor
                    note={activeNote}
                    onNoteUpdate={updateNote}
                    onToggleSidebar={toggleSidebar}
                    isSidebarOpen={isSidebarOpen}
                />
            </div>
        </div>
    )
}