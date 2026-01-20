"use client";

import { useState } from "react";
import { Prompt } from "@/lib/db";
import { FileText, Lock, MoreVertical, Edit, Copy, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeletePromptDialog } from "../dialog/delete-prompt-dialog";

interface PromptCardProps {
  prompt: Prompt;
  onDelete: (id: number) => void;
  onDuplicate: (id: number) => void;
  onEdit: (prompt: Prompt) => void;
}

export function PromptCard({
  prompt,
  onDelete,
  onDuplicate,
  onEdit,
}: PromptCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const isSystem = prompt.id && prompt.id < 0;

  return (
    <>
      <Card className="group relative">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-4 w-4 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  {prompt.name}
                  {isSystem && (
                    <Lock className="h-3 w-3 text-muted-foreground" />
                  )}
                </CardTitle>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  disabled={!!isSystem}
                  onClick={() => onEdit(prompt)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDuplicate(prompt.id!)}>
                  <Copy className="mr-2 h-4 w-4" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  disabled={!!isSystem}
                  onClick={() => setShowDeleteDialog(true)}
                  className="text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {prompt.content}
          </p>
          <div className="flex items-center gap-2">
            <Badge
              variant={prompt.type === "question" ? "default" : "secondary"}
            >
              {prompt.type === "question" ? "Question" : "Answer"}
            </Badge>
            {isSystem && <Badge variant="outline">System</Badge>}
          </div>
        </CardContent>
      </Card>
      <DeletePromptDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={() => onDelete(prompt.id!)}
      />
    </>
  );
}
