import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";

const IndustryInsightsPage = async () => {
  const { isNotOnboarded } = await getUserOnboardingStatus();

  if (isNotOnboarded) {
    redirect("/onboarding");
  }

  return <div>IndustryInsightsPage</div>;
};

export default IndustryInsightsPage;
