"use client";

import { useState } from "react";

export function useHistorySearch() {
  const [searchQuery, setSearchQuery] = useState("");
  return { searchQuery, setSearchQuery };
}
