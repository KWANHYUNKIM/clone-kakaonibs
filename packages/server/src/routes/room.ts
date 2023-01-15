import { Router } from "express";

import Room from "../schemas/room";
import User from "../schemas/user";

const router = Router();

/* Index of chatting room  */
router.get( '/', async (req, res) => {
    try {
        const rooms = await Room.findAll( {
            include: User
        });
        res.json(rooms);
    }catch (e) {}
})

/* Detail of chatting room */

router.get( '/:roomId', async (req, res) => {
    try {
        const room = await Room.findAll( {
            include: User
        });
        res.json(room);
    }catch (e) {}
})

/* Insert chatting room */

router.post( '/', async (req, res) => {
    try {
        const room = await Room.create( {
            opponentId: req.body.opponentId
        });
        res.json(room);
    }catch (e) {}
})

export default router;