"use client";

import { ApiKeySettings } from "@/components/settings/api-key/api-key-settings";
import { SettingsHeader } from "@/components/settings/header/settings-header";
import { DefaultModelSelector } from "@/components/settings/model/default-model-selector";
import { useSettings } from "@/hooks/settings/use-settings";

export default function SettingsPage() {
  const { isLoading } = useSettings();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground animate-pulse">
          Loading settings...
        </p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto">
      <div className="flex flex-col gap-6 p-4 md:p-6 pt-16 md:pt-6 max-w-5xl mx-auto">
        {/* Page Header */}
        <SettingsHeader />

        {/* API Key Settings */}
        <ApiKeySettings />

        {/* Default Model */}
        <DefaultModelSelector />
      </div>
    </div>
  );
}
