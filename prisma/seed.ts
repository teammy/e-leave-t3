import { prisma } from '~/server/db'

async function main() {

}

main().then(async () =>{
  await prisma.$disconnect()
})