import React from "react";
import {motion} from "framer-motion";
import {
    Heart,
    Target,
    Users,
    Coffee,
    BookOpen,
    Laptop,
    Lightbulb,
    Globe,
} from "lucide-react";

export const StoryList = () => {
    // Animation definition
    const fadeInUp = {
        initial: {opacity: 0, y: 60},
        animate: {opacity: 1, y: 0},
        transition: {duration: 0.6},
    };

    const storyData = [
        {
            title: "Where It All Started",
            content: `I give all credits to my father.

My father has been writing a diary since the dawn of time, at least my time. He told me to do so too. Then I picked it up just before my teenage years. Writing my handwritten diaries for years to come in my life.

But then college life kicked in. I dropped it, after 11 long good years of writing my diary. Of course why wouldn't I not, it was time-taking, laborious and really, I made very little use of the information from the good old writing day in day out. On top of that, all the college life ins and outs comes along, why would I give my time to this, when I could instead spend my time on more fun things, flings here and there.`,
            imageLeft: true,
            imagePath: "/assets/s1.png",
            imageAlt: "A vintage diary and pen on a wooden desk",
            icon: BookOpen,
        },
        {
            title: "The Digital Awakening",
            content: `Another 6 years passed by, and I started working – fortunate that I was able to attend one of the top management schools in my country, which really expanded my horizons and experience with people – Now, I'm on the verge of becoming the one adult fellow, my life was basically taking the busy man route. The mind was even worse, it was in chaos, literally. I have so much I want to do in life, so many ideas, so much to learn, so much to ponder on, responsibilities here and there, I just couldn't handle it. It almost crushed me. I needed clarity of mind.`,
            imageLeft: false,
            imagePath: "/assets/s2.png",
            imageAlt: "Laptop with digital notes and mobile apps",
            icon: Laptop,
        },
        {
            title: "Building Something Meaningful",
            content: `In the nick of time, I came across this 2nd brain concept. I was sold. No wonder, it wasn't rocket science, in this digital day and age, why would I not be. We consume information every minute, every second, our primitive brain growth way lacks the growth of our information consumption. Our one day information take in, would possibly have been the amount which my great grandfather would have taken in during his whole lifetime.`,
            linkText: "link",
            linkUrl: "https://www.matt-bristow.com/do-we-consume-too-much-information",
            additionalContent: `Wallahh, I now want to get on back with my journal. But this time the thinking is more structured and output oriented. I said, no more handwritten, that is too old papa's way. I need a more robust and meaningful system to do so. If I'm going to spend my time doing this laborious task again it has to be in the finger pen world – which by the way I believe I will augment it again very soon – My data outputted this time should be processable, analyseable and give a beautiful meaning of my life.`,
            imageLeft: true,
            imagePath: "/assets/s3.png",
            imageAlt: "Code editor and design mockups",
            icon: Lightbulb,
        },
        {
            title: "Finding the Right Platform",
            content: `Over a year, I then tried different platforms to carry out this concept I have in my head. I tried different Notes apps, Reddit, Email, Docs, Numbers, Evernote and the Notions of the world, you name it. Nothing could work just right. As a free man, I also wanted to be able to do it free, so that every Tom, Dick, Harry can also do it, if they so want to make their life chaos into clarity. The soul searching was real.

Having an Okay-Tech background, I also also wanted to make the most of existing platforms, as long as possible and not create a new application or platform to do the same, as long as the job can be done, why sell people.`,
            imageLeft: false,
            imagePath: "/assets/s4.png",
            imageAlt: "Multiple app icons and platforms",
            icon: Globe,
        },
        {
            title: "The Google Sheets Solution",
            content: `After a year of tinkering, I ultimately invented a system with Google Sheets – in hindsight why didn't it hit me at the start itself, I say – Caters to my every need, it's free, data outputted into it is processable, analyseable with combination of formulae and can give a beautiful dashboard of my life, which gives me immense joy, seeing my life painted out in data.

How I love it. It's been 3+ years of my personal journey of testing the system. I now want to share with the world and you, if you are still reading to this end, I believe you too want clarity badly and hopefully understand the value in the system.`,
            imageLeft: true,
            imagePath: "/assets/s5.png",
            imageAlt: "Dashboard and data visualization",
            icon: Heart,
        },
        {
            title: "Join the Journey",
            content: `Change is never easy, come join in and make your life data beautiful too. Early Adopters like you can help build on the system, use it, contribute and let's create a better world by understanding oneself clearer than ever before in human history. Who knows, you may be the next Albert, Steve or any one of them who changed the trajectory of human life. But this time it's gonna be different. Generations will now have deep insights into how it all comes together and build on it and better their life over.
        Cheers.

        fegaloQ dream-Fellow`,
            imageLeft: false,
            imagePath: "/assets/s6.png",
            imageAlt: "Community collaboration and growth",
            icon: Users,
        },
    ];

    return (
        <section className="py-20 pt-40 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div className="text-center mb-20" {...fadeInUp}>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        KeyTagJo Story
                    </h2>
                </motion.div>

                {/* Story Loop */}
                <div className="space-y-20 lg:space-y-32">
                    {storyData.map((section, index) => (
                        <motion.div
                            key={index}
                            className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
                                section.imageLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                            }`}
                            initial={{opacity: 0, y: 60}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{duration: 0.8, delay: 0.2}}
                            viewport={{once: true}}
                        >
                            {/* Image Section */}
                            <div className="flex-1 lg:max-w-md">
                                <div className="relative">
                                    <div className="rounded-2xl overflow-hidden shadow-lg">
                                        {/* Using standard img tag for Inertia/React */}
                                        <img
                                            src={section.imagePath}
                                            alt={section.imageAlt}
                                            className="w-full h-96 object-cover"
                                        />
                                        <div
                                            className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="flex-1">
                                <div className="max-w-2xl lg:max-w-none">
                                    <div className="text-lg text-gray-700 leading-8 space-y-6">
                                        {section.content.split("\n\n").map((paragraph, idx) => (
                                            <p key={idx} className="text-justify lg:text-left">
                                                {paragraph.trim()}
                                            </p>
                                        ))}

                                        {section.linkText && section.linkUrl && (
                                            <p className="text-justify lg:text-left">
                                                <a
                                                    href={section.linkUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[#12b5e2] hover:text-[#0ea5d3] underline"
                                                >
                                                    {section.linkText}
                                                </a>
                                            </p>
                                        )}

                                        {section.additionalContent &&
                                            section.additionalContent
                                                .split("\n\n")
                                                .map((paragraph, idx) => (
                                                    <p
                                                        key={`additional-${idx}`}
                                                        className="text-justify lg:text-left"
                                                    >
                                                        {paragraph.trim()}
                                                    </p>
                                                ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
