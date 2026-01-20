"use client";

import { Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

interface HistoryHeaderProps {
  rawWorkflowsCount: number;
  isDeletingAll: boolean;
  handleDeleteAll: () => Promise<void>;
}

export function HistoryHeader({
  rawWorkflowsCount,
  isDeletingAll,
  handleDeleteAll,
}: HistoryHeaderProps) {
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <div className="min-w-0 flex-1">
        <h1 className="text-2xl md:text-3xl font-bold truncate pr-2">Research History</h1>
        <p className="text-sm md:text-base text-muted-foreground mt-1 text-pretty">
          View, search, and manage your past research workflows.
        </p>
      </div>

      {rawWorkflowsCount > 0 && (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="destructive"
              size="sm"
              className="h-8 w-8 p-0 md:h-9 md:w-auto md:px-4 flex-shrink-0"
            >
              <Trash2 className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Delete All</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Clear All History?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete all
                your research history.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={handleDeleteAll} variant="destructive">
                  {isDeletingAll ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Delete Everything
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
