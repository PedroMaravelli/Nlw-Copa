import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
    const user =  await prisma.user.create({
        data: {
          name: 'John Doe',
          email: 'jdoe@example.com',
          avatarUrl: 'https://github.com/renanvcb.png',
        }
      })

    const pool = await prisma.poll.create({
      data:{
        title: 'Bolão John ',
        code: 'BOL123',
        ownerId: user.id,

        participants:{
          create:{
            userId: user.id
          }
        }
      }
      
    })


    await prisma.game.create({
      data:{
        firstTeamCountryCode:'BR',
        secondTeamCountryCode: 'DE',
        date: '2022-11-07T20:00:00.063Z'
      }
    })

    await prisma.game.create({
      data:{
        date: '2022-11-09T10:00:00.063Z',
        firstTeamCountryCode:'BR',
        secondTeamCountryCode:'AR',

        guesses:{
          create :{
            firstTeamPoints: 3,
            secondTeamPoints: 1,
            
            participant:{
              connect:{
                userId_poolId:{
                  userId: user.id,
                  poolId: pool.id
                }
              }
            }


          }
        }

        
      }

    })

    

   
}

main()