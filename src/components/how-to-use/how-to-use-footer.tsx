"use client";

export function HowToUseFooter() {
    return (
        <div className="text-center pt-4">
            <p className="text-sm text-muted-foreground">
                Need more help? Check out our{" "}
                <a
                    href="https://github.com/dinethlive/dr-engine"
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:underline font-medium"
                >
                    GitHub Documentation
                </a>
            </p>
        </div>
    );
}
