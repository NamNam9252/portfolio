"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, FileText } from "lucide-react";

interface ResumeModalProps {
    isOpen: boolean;
    onClose: () => void;
    pdfUrl: string;
}

export default function ResumeModal({ isOpen, onClose, pdfUrl }: ResumeModalProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop with Blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                        className="relative w-full max-w-5xl h-[85vh] bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-white/10"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 px-6 border-b border-neutral-200 dark:border-white/10 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
                            <div className="flex items-center gap-2 text-neutral-900 dark:text-white font-bold text-lg">
                                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                    <FileText size={16} />
                                </div>
                                Resume Preview
                            </div>

                            <div className="flex items-center gap-3">
                                {/* Download Button (Header version for desktop) */}
                                <a
                                    href={pdfUrl}
                                    download
                                    className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors text-sm"
                                >
                                    <Download size={16} />
                                    Download PDF
                                </a>

                                <button
                                    onClick={onClose}
                                    className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-white/5 flex items-center justify-center text-neutral-500 hover:bg-neutral-200 dark:hover:bg-white/10 hover:text-black dark:hover:text-white transition-all"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* PDF Viewer Area */}
                        <div className="flex-1 w-full h-full bg-neutral-100 dark:bg-zinc-950/50 relative">
                            <iframe
                                src={pdfUrl}
                                className="w-full h-full border-none"
                                title="Resume PDF"
                            />

                            {/* Fallback/Overlay for mobile where iframes might be tricky or small */}
                            <div className="absolute inset-0 pointer-events-none sm:hidden flex items-center justify-center bg-transparent">
                                {/* We let the native PDF viewer handle it, usually works. 
                      Or we could show a message if it doesn't load. */}
                            </div>
                        </div>

                        {/* Mobile Footer Action */}
                        <div className="sm:hidden p-4 border-t border-neutral-200 dark:border-white/10 bg-white dark:bg-zinc-900 flex justify-center">
                            <a
                                href={pdfUrl}
                                download
                                className="flex w-full items-center justify-center gap-2 px-6 py-3 rounded-xl bg-purple-600 active:bg-purple-700 text-white font-bold transition-colors"
                            >
                                <Download size={18} />
                                Download Resume
                            </a>
                        </div>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
