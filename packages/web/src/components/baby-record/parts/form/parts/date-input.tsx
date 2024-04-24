import React from "react";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { pickersLayoutClasses } from "@mui/x-date-pickers/PickersLayout";

interface DateInputProps {
    label: string;
    value?: Date;
    onChange: (value: Date) => void;
}

export function DateInput({ label, value, onChange }: DateInputProps) {
    return (
        <DateTimePicker
            value={dayjs(value)}
            onChange={(v) => v && onChange(v.toDate())}
            views={["year", "month", "day", "hours", "minutes"]}
            label={label}
            format={"HH:mm  -  DD/MM/YYYY"}
            slotProps={{
                textField: { size: "small", color: "warning" },
                layout: {
                    sx: {
                        [`.${pickersLayoutClasses.actionBar}`]: {
                            backgroundColor: "#E1E9F0",
                            ["& button"]: {
                                color: "#ed6c02"
                            }
                        },
                        [`.${pickersLayoutClasses.toolbar}`]: {
                            backgroundColor: "#E1E9F0"
                        },
                        [`.${pickersLayoutClasses.tabs}`]: {
                            backgroundColor: "#2E3B4F",
                            [".css-1aquho2-MuiTabs-indicator"]: {
                                backgroundColor: "#ed6c02"
                            },
                            [".css-y0fr9s-MuiButtonBase-root-MuiTab-root.Mui-selected"]: {
                                color: "#ed6c02"
                            }
                        },
                        [`.${pickersLayoutClasses.contentWrapper}`]: {
                            backgroundColor: "#E1E9F0",
                        },
                    }
                },
                calendarHeader: { sx: { color: "#ed6c02" } }
            }}
        />
    );
}
