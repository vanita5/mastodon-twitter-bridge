// @flow
import { toClientUser } from '../converter/user';
import UUID from 'uuid-js';

export async function saveConnection(
    con?: $Shape<ClientConnection>,
    userId?: string
): Promise<{ status: number, connection?: ClientConnection }> {
    if (!userId || !con || !(con.id || (con.target && con.source))) {
        return { status: 400 };
    }

    const [oldUser] = await db.findOne({ _id: userId });
    if (!oldUser) {
        return { status: 404 };
    }
    const oldClientUser = toClientUser(oldUser);

    try {
        if (con.id) {
            if (con.id.indexOf('.') !== -1) {
                return { status: 400 };
            }
            //TODO add check if changed settings make this connection equal to another one (fail then)
            const [updatedRows, updatedUser] = await db.update(
                { _id: userId },
                {
                    $set: {
                        [`${con.id}.settings`]: con.settings || {},
                    },
                },
                { returnUpdatedDocs: true }
            );
            if (!updatedUser) {
                return { status: 404 };
            }
            const clientUser = toClientUser(updatedUser);
            const connection = clientUser.connections.find(u => u.id === con.id);
            console.log(clientUser, connection);
            return {
                status: updatedRows > 0 ? 200 : 404,
                connection,
            };
        }
        //assuming new
        if (typeof con.target.id !== 'string' || typeof con.source.id !== 'string') {
            return { status: 400 };
        }

        //TODO add check for changed settings when relevant
        if (
            oldClientUser.connections.some(
                c => c.source.id === con.source.id && c.target.id === con.target.id
            )
        ) {
            return { status: 400 };
            //TODO add clientside notification
        }

        const newId = UUID.create().toString();
        const [updatedRows, updatedUser] = await db.update(
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
            { returnUpdatedDocs: true }
        );
        if (!updatedUser) {
            return { status: 404 };
        }
        const clientUser = toClientUser(updatedUser);
        const connection = clientUser.connections.find(u => u.id === newId);
        console.log(clientUser, connection);
        return {
            status: updatedRows > 0 ? 200 : 404,
            connection,
        };
    } catch (e) {
        return { status: 500 };
    }
}

export async function deleteConnection(userId?: string, conId: string): Promise<number> {
    if (!userId || !conId || conId.indexOf('.') !== -1) {
        return 400;
    }

    const [updatedRows] = await db.update(
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
