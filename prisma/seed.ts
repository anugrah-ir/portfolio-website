import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const siteCount = await prisma.site.count();
  if (siteCount === 0) {
    const site = await prisma.site.create({
      data: {
        title: "My Portfolio",
        description: "A showcase of my projects and skills",
        favicon: "/favicon.ico",
      },
    });
    console.log("Created Site:", site);
  } else {
    console.log("Site already exists, skipping...");
  }

  const authorCount = await prisma.author.count();
  let author;

  if (authorCount === 0) {
    author = await prisma.author.create({
      data: {
        name: "John Doe",
        nickName: "johndoe",
        role: "Full Stack Developer",
        bio: "Passionate developer with experience in building web applications",
        avatar: "/images/avatar.jpg",
      },
    });
    console.log("Created Author:", author);
  } else {
    author = await prisma.author.findFirst();
    console.log("Author already exists, skipping...");
  }

  if (author) {
    const socialCount = await prisma.social.count();
    if (socialCount === 0) {
      const social = await prisma.social.create({
        data: {
          email: "john.doe@example.com",
          whatsapp: "+1234567890",
          github: "https://github.com/johndoe",
          linkedin: "https://linkedin.com/in/johndoe",
          instagram: "https://instagram.com/johndoe",
          authorId: author.id,
        },
      });
      console.log("Created Social:", social);
    } else {
      console.log("Social already exists, skipping...");
    }
  }

  console.log("Seed completed successfully");
}

main()
  .catch((e) => {
    console.error("Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
