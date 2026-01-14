import React from "react";
import { motion } from "framer-motion";

export const MusicQuote = () => {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <div className="bg-gradient-to-r from-[#12b5e2]/10 to-[#12b5e2]/10 rounded-2xl p-8 border border-[#12b5e2]/20">
                        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                            Thanks to Straals for creating: Hans Zimmer | ULTIMATE
                            Soundtrack Compilation Mix. I so happen to finish this piece in
                            exactly 58 mins 12 seconds (for real) Link:{" "}
                            <a
                                href="https://youtu.be/IqiTJK_uzUY?si=sucHo8mdO3CibRaN"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#12b5e2] hover:text-[#0ea5d3] no-underline font-medium"
                            >
                                https://youtu.be/IqiTJK_uzUY?si=sucHo8mdO3CibRaN
                            </a>
                            <br />
                            <span className="block mt-4 italic text-gray-500">
                                "I use this track whenever I want to Flow focus. Every sprint,
                                the first 1 min 29 secs I would close my eyes and suddenly
                                open my eyes when the Music hits and start the Flow"
                            </span>
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
