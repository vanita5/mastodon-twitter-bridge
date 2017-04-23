// @flow
import UUID from 'uuid-js';

export async function saveConnection(con?: $Shape<ClientConnection>, userId?: string): Promise<number> {
    if (!userId || !con || !(con.id || (con.target && con.source))) {
        return 400;
    }

    try {
        if (con.id) {
            if (con.id.indexOf('.') !== -1) {
                return 400;
            }
            const updatedRows = await db.update(
                { _id: userId },
                {
                    $set: {
                        [`${con.id}.settings`]: con.settings || {},
                    },
                },
                {}
            );
            return updatedRows > 0 ? 200 : 404;
        }
        //assuming new
        if (typeof con.target.id !== 'string' || typeof con.source.id !== 'string') {
            return 400;
        }
        const newId = UUID.create().toString();
        const updatedRows = await db.update(
            { _id: userId },
            {
                $set: {
                    [`connections.${newId}`]: {
                        settings: {},
                        ...{
                            target: con.target.id,
                            source: con.source.id,
                            settings: con.settings, //optional
                        },
                        id: newId,
                    },
                },
            },
            {}
        );
        return updatedRows > 0 ? 200 : 404;
    } catch (e) {
        return 500;
    }
}

export async function deleteConnection(userId?: string, conId: string): Promise<number> {
    if (!userId || !conId || conId.indexOf('.') !== -1) {
        return 400;
    }

    const updatedRows = await db.update(
        { _id: userId },
        {
            $unset: {
                [`connections.${conId}`]: true,
            },
        },
        {}
    );

    return updatedRows > 0 ? 200 : 404;
}
