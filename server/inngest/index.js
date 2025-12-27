import { Inngest } from "inngest";
import prisma from "../configs/prisma.js";

// Create Inngest client
export const inngest = new Inngest({ id: "project-management" });

/**
 * CREATE / SYNC USER
 * Safe because user.created should only insert once
 */
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { data } = event;

    await prisma.user.upsert({
      where: { id: data.id },
      update: {
        email: data?.email_addresses[0]?.email_address,
        name: `${data?.first_name ?? ""} ${data?.last_name ?? ""}`,
        image: data?.image_url,
      },
      create: {
        id: data.id,
        email: data?.email_addresses[0]?.email_address,
        name: `${data?.first_name ?? ""} ${data?.last_name ?? ""}`,
        image: data?.image_url,
      },
    });
  }
);

/**
 * DELETE USER
 * deleteMany is SAFE even if user doesn't exist
 */
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { data } = event;

    await prisma.user.deleteMany({
      where: { id: data.id },
    });
  }
);

/**
 * UPDATE USER
 * Use upsert to avoid "record not found" error
 */
const syncUserUpdation = inngest.createFunction(
  { id: "update-user-with-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { data } = event;

    await prisma.user.upsert({
      where: { id: data.id },
      update: {
        email: data?.email_addresses[0]?.email_address,
        name: `${data?.first_name ?? ""} ${data?.last_name ?? ""}`,
        image: data?.image_url,
      },
      create: {
        id: data.id,
        email: data?.email_addresses[0]?.email_address,
        name: `${data?.first_name ?? ""} ${data?.last_name ?? ""}`,
        image: data?.image_url,
      },
    });
  }
);

// Export all functions
export const functions = [
  syncUserCreation,
  syncUserDeletion,
  syncUserUpdation,
];
