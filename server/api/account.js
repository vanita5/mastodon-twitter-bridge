// @flow

export async function deleteAccount(
    accountId?: string,
    type?: string,
    userId?: string
): Promise<number> {
    if (
        !userId ||
        !accountId ||
        !type ||
        (type !== 'mastodon' && type !== 'twitter') ||
        accountId.indexOf('.') !== -1
    ) {
        return 400;
    }

    const updatedRows = await db.update(
        { _id: userId },
        {
            $unset: {
                [`${type}.${accountId}`]: true,
            },
        },
        {}
    );

    return updatedRows > 0 ? 200 : 404;
}
