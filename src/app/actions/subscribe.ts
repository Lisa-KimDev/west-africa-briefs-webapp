"use server";

import { revalidatePath } from "next/cache";

const LISTMONK_URL = process.env.LISTMONK_URL;
const LISTMONK_LIST_UUID = process.env.LISTMONK_LIST_UUID;

export async function subscribeToList(formData: FormData) {
  const email = formData.get("email") as string;

  if (!email || !email.includes("@")) {
    return { success: false, message: "Please enter a valid email address." };
  }

  if (!LISTMONK_URL || !LISTMONK_LIST_UUID) {
    return {
      success: false,
      message: "Newsletter is not configured yet. Please try again later.",
    };
  }

  try {
    const res = await fetch(`${LISTMONK_URL}/subscription/form`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        email,
        l: LISTMONK_LIST_UUID,
      }),
      redirect: "manual",
    });

    if (res.ok || res.status === 302) {
      revalidatePath("/");
      return {
        success: true,
        message: "You're in! Welcome to West Africa Briefs.",
      };
    }

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  } catch {
    return {
      success: false,
      message: "Network error. Please try again later.",
    };
  }
}
