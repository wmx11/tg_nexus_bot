import { PrismaClient } from '@prisma/client';
import { getMemberId } from '../utils';
const prisma = new PrismaClient();

const increaseMessageCount = async (ctx: any) => {
  console.log(ctx); 
  const message = ctx.update.message;

  
    // try {
    //     const id = getMemberId(ctx);

    //     if (!id) {
    //         return null;
    //     }

    //     const existingUser = await prisma.user.findFirst({
    //         where: {
    //             user_id: id,
    //         },
    //     });

    //     if (!existingUser) {
    //         await prisma.user.create({
    //             data: {
    //                 user_id: id,
    //                 message_count: 1,
    //                 last_message: new Date(),
    //             },
    //         });
    //         return null;
    //     }

    //     await prisma.user.update({
    //         data: {
    //             message_count: existingUser.message_count + 1,
    //             last_message: new Date(),
    //         },
    //         where: {
    //             id: existingUser.id,
    //         },
    //     });
    // } catch (error) {
    //     console.log(error);
    // }
};

export default increaseMessageCount;
