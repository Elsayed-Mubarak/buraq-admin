"use client"
import { CheckboxInput } from "./shared/CheckboxInput"
const channelItems = [
    "Email",
    "Facebook",
    "Instagram",
    "SMS",
    "Web",
    "WhatsApp",
];
export function ChannelsSection() {
    return (
        <div className="mt-6">
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-2">
                {channelItems.map((item) => {
                   const defaultChecked = ["Facebook", "SMS", "Web", "WhatsApp"].includes(item);
                   return( <CheckboxInput key={item} label={item} disabled defaultChecked={defaultChecked} />)
                })}
            </div>
        </div>
    )
}