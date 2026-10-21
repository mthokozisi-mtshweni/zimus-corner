const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const email = "admin@zimucorner.co.za";
  const plainPassword = "admin123";

  console.log("Hashing password...");
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  console.log("Upserting admin user...");
  const user = await prisma.user.upsert({
    where: { email },
    update: { password: hashedPassword }, // If exists, just reset the password
    create: {
      email,
      password: hashedPassword,
      name: "Resort Owner",
      role: "OWNER",
    },
  });

  console.log("✅ Admin user ready!");
  console.log("   Email:", user.email);
  console.log("   Password:", plainPassword);
  console.log("   Role:", user.role);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });