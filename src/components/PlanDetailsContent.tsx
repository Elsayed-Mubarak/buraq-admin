// components/PlanDetailsContent.tsx
"use client";
import React from "react";
import { SectionTitle } from "./shared/SectionTitle";
import { SMSPricingSection } from "./SMSPricingSection";
import { ActionBlockSection } from "./ActionBlockSection";
import { ChatWidgetSection } from "./ChatWidgetSection";
import { UtilitySection } from "./UtilitySection";
import { CustomIntegrationSection } from "./CustomIntegrationSection";
import { AIStudioSection } from "./AIStudioSection";
import { ChannelsSection } from "./ChannelsSection";
//import { Plan } from "@/app/types/Types";
import { Plan } from "@/app/dashboard/settings/pricing/plans/types/Types";
import { UsageSection } from "./UsageSection";

interface PlanDetailsContentProps {
  plan?: Plan | null;
}

export function PlanDetailsContent({ plan }: PlanDetailsContentProps) {
  return (
    <div className="mt-2">
      <SectionTitle title="Usage" />
      <UsageSection plan={plan} />
      <SectionTitle title="SMS Pricing" />
      <SMSPricingSection />
      <SectionTitle title="Action block" />
      <ActionBlockSection />
      <SectionTitle title="Chat widget" />
      <ChatWidgetSection />
      <SectionTitle title="Utility" />
      <UtilitySection />
      <SectionTitle title="Custom integration" />
      <CustomIntegrationSection />
      <SectionTitle title="Channels" />
      <ChannelsSection />
      <SectionTitle title="AI Studio" />
      <AIStudioSection />
    </div>
  );
}
