"use client";

import { DateRange } from "react-day-picker";
import { format, subDays, startOfWeek, startOfDay, endOfDay } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface DateRangePickerWithPresetsProps {
    dateRange: DateRange | undefined;
    onDateRangeChange: (range: DateRange | undefined) => void;
    className?: string;
}

export function DateRangePickerWithPresets({
    dateRange,
    onDateRangeChange,
    className,
}: DateRangePickerWithPresetsProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleShortcutChange = (value: string) => {
        const today = new Date();
        let from: Date | undefined;
        let to: Date | undefined;

        switch (value) {
            case "today":
                from = startOfDay(today);
                to = endOfDay(today);
                break;
            case "yesterday":
                const yesterday = subDays(today, 1);
                from = startOfDay(yesterday);
                to = endOfDay(yesterday);
                break;
            case "this-week":
                from = startOfWeek(today, { weekStartsOn: 1 });
                to = endOfDay(today);
                break;
            case "last-7-days":
                from = startOfDay(subDays(today, 6));
                to = endOfDay(today);
                break;
            case "last-30-days":
                from = startOfDay(subDays(today, 29));
                to = endOfDay(today);
                break;
            case "clear":
                onDateRangeChange(undefined);
                return;
            default:
                return;
        }

        if (from && to) {
            onDateRangeChange({ from, to });
        }
    };

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-full sm:w-[260px] justify-start text-left font-normal",
                            !dateRange && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange?.from ? (
                            dateRange.to ? (
                                <>
                                    {format(dateRange.from, "LLL dd, y")} -{" "}
                                    {format(dateRange.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(dateRange.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                        {dateRange && (
                            <div
                                className="ml-auto rounded-full hover:bg-muted p-0.5"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDateRangeChange(undefined);
                                }}
                            >
                                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                            </div>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                    <div className="flex flex-col border-b p-3 space-y-2">
                        <Select onValueChange={handleShortcutChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select preset..." />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                <SelectItem value="today">Today</SelectItem>
                                <SelectItem value="yesterday">Yesterday</SelectItem>
                                <SelectItem value="this-week">This Week</SelectItem>
                                <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                                <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="p-3">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={dateRange?.from}
                            selected={dateRange}
                            onSelect={onDateRangeChange}
                            numberOfMonths={2}
                        />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
