'use client'

import { useState, useEffect } from 'react'
import NotesApp from '@/components/NotesApp'

export default function Home() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-gray-400">Loading...</div>
            </div>
        )
    }

    return <NotesApp />
}