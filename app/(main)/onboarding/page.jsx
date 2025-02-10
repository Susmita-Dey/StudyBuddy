import { getUserOnboardingStatus } from "@/actions/user";
import { industries } from "@/data/industries";
import { redirect } from "next/navigation";
import React from "react";

const OnboardingPage = async () => {
  // Check if user is already onboarded
  const { isOnboarded } = await getUserOnboardingStatus();

  if (isOnboarded) {
    redirect("/dashboard");
  }

  return (
    <main>
      <OnboardingForm industries={industries} />
    </main>
  );
};

export default OnboardingPage;
