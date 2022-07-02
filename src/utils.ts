export const getMemberId = (ctx: any): number | undefined => {
    const id = ctx?.update?.message?.from?.id;
    return id;
};

export const isAdmin = async (ctx: any): Promise<boolean> => {
    if (!ctx) {
        return false;
    }

    const id = getMemberId(ctx);

    if (!id) {
        return false;
    }

    const member = await ctx.getChatMember(id);

    if (!member) {
        return false;
    }

    const hasAdminRole = !!['creator', 'admin'].find(
        (role) => role === member.status
    );

    return hasAdminRole;
};
