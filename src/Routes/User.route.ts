import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { Request, Response } from 'express';
import { UserSchema } from '../Schemas/User';

const router = require('express').Router();

router.post('/register', async (req: Request, res: Response): Promise<Response> => {

    const validation = UserSchema.validate(req.body);
    if (validation.error) {
        return res.status(400).send(validation);
    }

    let user = await getRepository(User).findOne({ where: { email: req.body.email } });
    if (user) {
        return res.status(409).send(`${req.body.email} is already on use by another user`)
    }

    const newUser = getRepository(User).create(validation.value);
    const result = await getRepository(User).save(newUser);

    return res.status(201).send(result);
});

export default router;