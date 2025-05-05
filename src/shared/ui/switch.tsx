"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@shared/lib/utils"
import {Moon, SunMedium} from "lucide-react";

interface CustomSwitchProps extends React.ComponentProps<typeof SwitchPrimitive.Root> {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

function Switch({
  className,
  checked,
  ...props
}: CustomSwitchProps) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      checked={checked}
      className={cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 dark:data-[state=checked]:bg-accent inline-flex h-[1.5rem] w-11 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "flex items-center justify-center bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none size-5 rounded-full ring-0 transition-transform duration-300 ease-out data-[state=checked]:translate-x-[calc(100%)] data-[state=unchecked]:translate-x-0 mx-[1px]"
        )}
      >
        {checked ? (
          <Moon className="h-4 w-4 text-white-200" />
        ) : (
          <SunMedium className="h-4 w-4 text-yellow-500" />
        )}

      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  )
}

export { Switch }
