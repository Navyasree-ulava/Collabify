import { Inngest } from "inngest";
import prisma from "../configs/prisma.js";
import sendEmail from "../configs/nodemailer.js";

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

// Inngest Function to save workspace data to a database
const syncWorkspaceCreation = inngest.createFunction(
    {id: 'sync-workspace-with-clerk'},
    {event: 'clerk/organization.created'},
    async ({ event }) => {
        const {data} = event;

        await prisma.workspace.create({
             data: {
                id: data.id,
                name: data.name,
                slug: data.slug,
                ownerId: data.created_by,
                image_url: data.image_url,
             }
        })

        await prisma.workspaceMember.create({
            data: {
                userId: data.created_by,
                workspaceId: data.id,
                role: "ADMIN"
            }
        })
    }
)

// inngest function to update workspace data in database
const syncWorkspaceUpdation = inngest.createFunction(
    {id: 'update-workspace-with-clerk'},
    {event: 'clerk/organization.updated'},
    async ({ event }) => {
        const {data} = event;

        await prisma.workspace.update({
            where: {id: data.id},
            data: {
                name: data.name,
                slug: data.slug,
                image_url: data.image_url,
            }
        })
    }
)

// inngest function to delete workspace from database
const syncWorkspaceDeletion = inngest.createFunction(
    {id: 'delete-workspace-from-clerk'},
    {event: 'clerk/organization.deleted'},
    async ({ event }) => {
        const {data} = event;

        await prisma.workspace.delete({
            where: {id: data.id},
        })
    }
)

// inngest function to save workspace member to database
const syncWorkspaceMemberCreation = inngest.createFunction(
    {id: 'sync-workspace-member-with-clerk'},
    {event: 'clerk/organizationInvitation.accepted'},
    async ({ event }) => {
        const {data} = event;

        await prisma.workspaceMember.create({
            data: {
                userId: data.user_id,
                workspaceId: data.organization_id,
                role: String(data.role_name).toUpperCase()
            }
        })
    }
)

// Inngest function to Send Email on Task Creation
const sendTaskAssignmentEmail = inngest.createFunction(
  {id: "send-task-assignment-mail"},
  {event: "app/task.assigned"},
  async ({event, step}) => {
    
    const {taskId, origin} = event.data;
    const task = await prisma.task.findUnique({
      where: {id: taskId},
      include: {assignee: true,project: true}
    })
    
    await sendEmail({
      to: task.assignee.email,
      subject: `New Task Assignment in ${task.project.name}`,
      body: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Task Assigned</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f5f7fb; font-family: Arial, Helvetica, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding: 40px 0;">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.05); overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td style="background-color:#4f46e5; padding:20px 30px;">
                <h1 style="margin:0; color:#ffffff; font-size:22px;">
                  📌 New Task Assigned
                </h1>
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding:30px;">
                <p style="margin:0 0 16px; font-size:16px; color:#333;">
                  Hello,
                </p>

                <p style="margin:0 0 16px; font-size:15px; color:#555;">
                  You have been assigned a new task. Here are the details:
                </p>

                <table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;">
                  <tr>
                    <td style="padding:8px 0; font-weight:bold; color:#444;">Task</td>
                    <td style="padding:8px 0; color:#555;">${task.title}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0; font-weight:bold; color:#444;">Project</td>
                    <td style="padding:8px 0; color:#555;">${task.project.name}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0; font-weight:bold; color:#444;">Description</td>
                    <td style="padding:8px 0; color:#555;">${task.description}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0; font-weight:bold; color:#444;">Due Date</td>
                    <td style="padding:8px 0; color:#555;">
                      ${new Date(task.due_date).toLocaleDateString()}
                    </td>
                  </tr>
                </table>

                <!-- CTA Button -->
                <div style="margin-top:30px; text-align:center;">
                  <a 
                    href="${origin}" 
                    style="
                      display:inline-block;
                      padding:12px 24px;
                      background-color:#4f46e5;
                      color:#ffffff;
                      text-decoration:none;
                      font-weight:bold;
                      border-radius:6px;
                      font-size:14px;
                    "
                  >
                    View Task
                  </a>
                </div>

                <p style="margin-top:30px; font-size:13px; color:#777;">
                  If you have any questions, please check the project dashboard for more details.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color:#f1f3f8; padding:16px; text-align:center; font-size:12px; color:#888;">
                © ${new Date().getFullYear()} Collabify · All rights reserved
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`
    })

    if(new Date(task.due_date).toLocaleDateString() !== new Date().toLocaleDateString()){
       
      await step.sleepUntil('wait-for-the-due-date', new Date(task.due_date));

      await step.run('check-if-task-is-completed', async () => {
        const task = await prisma.task.findUnique({
            where: {id: taskId},
            include: {assignee: true,project: true}
          })
       })

       if(!task){
        return;
       }

       if(task.status !== "DONE"){
          await step.run('send-task-remainder-mail', async () => {
            await SendmailTransport({
              to: task.assignee.email,
              subject: `Reminder for ${task.project.name}`,
              body: `

              <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Task Reminder</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f5f7fb; font-family: Arial, Helvetica, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding: 40px 0;">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.05); overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td style="background-color:#f59e0b; padding:20px 30px;">
                <h1 style="margin:0; color:#ffffff; font-size:22px;">
                  ⏰ Task Reminder
                </h1>
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding:30px;">
                <p style="margin:0 0 16px; font-size:16px; color:#333;">
                  Hello,
                </p>

                <p style="margin:0 0 16px; font-size:15px; color:#555;">
                  This is a friendly reminder that the following task is still pending:
                </p>

                <table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;">
                  <tr>
                    <td style="padding:8px 0; font-weight:bold; color:#444;">Task</td>
                    <td style="padding:8px 0; color:#555;">${task.title}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0; font-weight:bold; color:#444;">Project</td>
                    <td style="padding:8px 0; color:#555;">${task.project.name}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0; font-weight:bold; color:#444;">Status</td>
                    <td style="padding:8px 0; color:#dc2626; font-weight:bold;">
                      ${task.status}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0; font-weight:bold; color:#444;">Due Date</td>
                    <td style="padding:8px 0; color:#555;">
                      ${task.due_date ? new Date(task.due_date).toLocaleDateString() : "No due date"}
                    </td>
                  </tr>
                </table>

                <p style="margin:20px 0; font-size:14px; color:#666;">
                  Please make sure to review and update the task status if needed.
                </p>

                <!-- CTA Button -->
                <div style="margin-top:30px; text-align:center;">
                  <a 
                    href="${origin}" 
                    style="
                      display:inline-block;
                      padding:12px 24px;
                      background-color:#f59e0b;
                      color:#ffffff;
                      text-decoration:none;
                      font-weight:bold;
                      border-radius:6px;
                      font-size:14px;
                    "
                  >
                    View Task
                  </a>
                </div>

                <p style="margin-top:30px; font-size:13px; color:#777;">
                  If you have already completed this task, you can safely ignore this reminder.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color:#f1f3f8; padding:16px; text-align:center; font-size:12px; color:#888;">
                © ${new Date().getFullYear()} Collabify · Task reminders help keep projects on track
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>       
              `
            })
          })
       }
       
    }
    
  }
)


// Export all functions
export const functions = [
  syncUserCreation,
  syncUserDeletion,
  syncUserUpdation,
  syncWorkspaceCreation,
  syncWorkspaceUpdation,
  syncWorkspaceDeletion,
  syncWorkspaceMemberCreation,
  sendTaskAssignmentEmail,
];
