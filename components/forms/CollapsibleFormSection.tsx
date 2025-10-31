"use client"

import { ReactNode } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react"

interface CollapsibleFormSectionProps {
  title: string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
  className?: string
}

export function CollapsibleFormSection({
  title,
  isOpen,
  onOpenChange,
  children,
  className = ""
}: CollapsibleFormSectionProps) {
  return (
    <Collapsible open={isOpen} onOpenChange={onOpenChange}>
      <Card className={`cursor-pointer hover:bg-muted/50 transition-colors ${className}`}>
        <CollapsibleTrigger asChild>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-md">{title}</CardTitle>
              {isOpen ? (
                <ChevronDownIcon className="h-4 w-4 transition-transform duration-300" />
              ) : (
                <ChevronRightIcon className="h-4 w-4 transition-transform duration-300" />
              )}
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent className="transition-all duration-300 ease-in-out data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:animate-in data-[state=open]:fade-in">
          <CardContent className="space-y-4 pt-2">
            {children}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}