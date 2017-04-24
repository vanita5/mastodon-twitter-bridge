// @flow

export async function deleteAccount(accountId?: string, type?: string, userId?: string): Promise<number> {
    if (
        !userId ||
        !accountId ||
        !type ||
        (type !== 'mastodon' && type !== 'twitter') ||
        accountId.indexOf('.') !== -1
    ) {
        return 400;
    }

    const [existingUser] = await db.findOne({ _id: userId });
    if (!existingUser) {
        return 404;
    }

    const connectionIds = Object.keys(existingUser.connections)
        .map(id => ({ ...existingUser.connections[id], id }))
        .filter(c => c.target === accountId || c.source === accountId)
        .map(c => c.id);

    const connectionDeletions = Object.keys(existingUser.connections)
        .filter(id => connectionIds.find(c => c === id))
        .reduce((obj, id) => ({ ...obj, [`connections.${id}`]: true }), {});

    const [updatedRows] = await db.update(
        { _id: userId },
        {
            $unset: {
                [`${type}.${accountId}`]: true,
                ...connectionDeletions,
            },
        },
        {}
    );

    return updatedRows > 0 ? 200 : 404;
}
