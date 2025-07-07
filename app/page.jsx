'use client'

import {useLocalStorage} from "@/hooks/useLocalStorage";
import {useEffect, useState} from "react";
import {generateId} from "@/utils/generateId";
import Sidebar from "@/components/Sidebar";
import Editor from "@/components/editor/Editor";

export default function Page() {

    const [notes, setNotes] = useLocalStorage('trilnote', []);
    const [activeNoteId, setActiveNoteId] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        <div className={`flex min-h-svh bg-gray-900 text-gray-100`}>
            <Sidebar
                notes={notes}
                activeNoteId={activeNoteId}
                onNoteSelect={setActiveNoteId}
                onNoteCreate={createNote}
                onNoteDelete={deleteNote}
                isOpen={isSidebarOpen}
                onToggle={toggleSidebar}
            />

            <div className={`flex-1 flex flex-col min-w-0`}>
                <Editor
                    note={activeNote}
                    onNoteUpdate={updateNote}
                    onNoteCreate={createNote}
                    onToggleSidebar={toggleSidebar}
                    isSidebarOpen={isSidebarOpen}
                />
            </div>
        </div>
    )
}