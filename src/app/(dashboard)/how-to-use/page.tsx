"use client";

import { HowToUseHeader } from "@/components/how-to-use/how-to-use-header";
import { HowToUseSteps } from "@/components/how-to-use/how-to-use-steps";
import { HowToUseTips } from "@/components/how-to-use/how-to-use-tips";
import { HowToUseFooter } from "@/components/how-to-use/how-to-use-footer";

export default function HowToUsePage() {
  return (
    <div className="h-full overflow-auto">
      <div className="flex flex-col gap-8 p-6 max-w-4xl mx-auto">
        <HowToUseHeader />
        <HowToUseSteps />
        <HowToUseTips />
        <HowToUseFooter />
      </div>
    </div>
  );
}
