import Fastify from "fastify";
import {PrismaClient} from '@prisma/client'
import Cors from "@fastify/cors";

const prisma = new PrismaClient({
    log: ['query']
})
async function bootstrap(){
    const fastify = Fastify({
        logger: true,
    })
    await fastify.register(Cors,{
        origin: true,
    })

    fastify.get('/pools/count', async (req, res) =>{
        const count = await prisma.poll.count()
        res.send(count)
    })
    
    await fastify.listen({port: 5000, host: '0.0.0.0'})
    
}
bootstrap()