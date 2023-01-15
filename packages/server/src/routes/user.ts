import { Router } from "express";
import {v4 as uuid} from 'uuid';

import User from "../schemas/user";
import { Op } from "sequelize";

const router = Router();

/* Index of user */
router.get( '/:roomId', async (req, res) => {
    try {
        const result = await User.findAndCountAll( {
           where: {
            id: {
                [Op.ne] : req.session.userId
            }
        }
    });
    res.json(result);
    } catch (e) {}
})


/* Checking of session */
router.get( '/:roomId', async (req, res) => {
    try {
        res.json( {
            username : req.session.username,
            userId: req.session.userId,
            isLogged: req.session.isLogged
    });
    } catch (e) {}
});
/* Login */
router.post('/login', async (req, res) => {
    try {
        const userId = uuid();
        const username = req.body.username;

        const user = await User.create( {
            id: userId,
            username
        });

        req.session.useranme = username;
        req.session.userId = userId;
        req.session.isLogged = true;

        req.session.save(() => {
            res.json ( {
                statusText: 'OK',
                data: user
            })
        });
    }catch (e){}
});
/* Logout */

router.post( '/logout', async (req, res) => {
    try {
        delete req.session.user;

        req.session.save(() => {
            res.redirect('/');
        })
    } catch (e) {}
});

export default router;
