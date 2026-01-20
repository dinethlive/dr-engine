"use client";

export function Header() {
    return (
        <>
            <h1 className="text-2xl font-semibold mb-2 text-center">
                What topic would you like to research?
            </h1>
            <p className="text-muted-foreground mb-8 text-center max-w-md">
                Enter a topic and I&rsquo;ll generate 12 thematic sections with research
                questions and comprehensive answers.
            </p>
        </>
    );
}
