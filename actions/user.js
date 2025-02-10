"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// Server actions
export async function updateUser(data) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Not authenticated");
    }

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId,
        }
    })

    if (!user) {
        throw new Error("User not found");
    }

    try {
        const result = await db.$transaction(
            async (tx) => {
                // find if the industry exists 
                let industryInsight = await tx.industryInsight.findUnique({
                    where: {
                        industry: data.industry,
                    }
                })

                // if industry does not exist, create the industry with default values - will replace it with AI later
                if (!industryInsight) {
                    industryInsight = await tx.industryInsight.create({
                        data: {
                            industry: data.industry,
                            salaryRanges: [],
                            growthRate: 0,
                            demandLevel: "Medium",
                            topSkills: [],
                            marketOutlook: "Neutral",
                            keyTrends: [],
                            recommendedSkills: [],
                            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week
                        }
                    })
                }

                // if industry exists, update the user
                const updatedUser = await tx.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        industry: data.industry,
                        experience: data.experience,
                        bio: data.bio,
                        skills: data.skills,
                    }
                })

                return { updatedUser, industryInsight };
            },
            {
                timeout: 1000, // default: 5000
            }
        )

        return result.user;
    } catch (error) {
        console.error("Error updating user and industry", error.message);
        throw new Error("Failed to update user profile");
    }
}

export async function getUserOnboardingStatus() {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Not authenticated");
    }

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId,
        }
    })

    if (!user) {
        throw new Error("User not found");
    }

    try {
        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId,
            },
            select: {
                industry: true,
            }
        });

        // if user has industry, they are onboarded
        return {
            isOnboarded: !!user?.industry
        }
    } catch (error) {
        console.error("Error getting user onboarding status", error.message);
        throw new Error("Failed to get user onboarding status");
    }
}