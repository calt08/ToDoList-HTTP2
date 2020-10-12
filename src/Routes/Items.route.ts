import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { ItemSchema, ItemPatchSchema } from '../Schemas/Items';
import { Item } from '../entity/Item';
import { User } from '../entity/User';
import * as basicAuth from 'express-basic-auth';
import * as http2 from 'http2';

let version = 1;

const itemsRouteHandler = async (req: http2.Http2ServerRequest, res: http2.Http2ServerResponse) => {
    if (req.url == '/items' && req.method == 'GET') {
        console.log("Items")
        // let items = await getRepository(Item).find();
        // let user = await getRepository(User).find();

        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify({
            item: "gola"
        }));


    } else {

    }



}

export { itemsRouteHandler };





const router = require('express').Router();

router.use(basicAuth({ authorizer: Authorizer, authorizeAsync: true }));

async function Authorizer(username: string, password: string, cb: Function) {
    let user = await getRepository(User).findOne({ where: { email: username } });
    if (user) {
        const userMatches = basicAuth.safeCompare(username, user.email)
        const passwordMatches = basicAuth.safeCompare(password, user.password)
        return cb(null, userMatches && passwordMatches);
    }
    return cb(null, false);
}

router.get('', async (req: Request, res: Response): Promise<Response> => {
    let items = await getRepository(Item).find();

    if (parseInt(<string>req.headers.etag) == version) {
        return res.status(304).send();
    }

    if (req.query.startDate) {
        const startDate = new Date(<string>req.query.startDate);
        items = items.filter(item => new Date(item.dueDate) >= startDate);
    }
    if (req.query.endDate) {
        const endDate = new Date(<string>req.query.endDate);
        items = items.filter(item => new Date(item.dueDate) <= endDate);
    }
    if (req.query.status) {
        items = items.filter(item => item.status == JSON.parse(<string>req.query.status));
    }

    return res.status(200).send({ version, items });
});

router.post('', async (req: basicAuth.IBasicAuthedRequest, res: Response): Promise<Response> => {
    const validation = ItemSchema.validate(req.body);

    if (validation.error) {
        return res.status(400).send(validation);
    }

    let user = await getRepository(User).findOne({ where: { email: req.auth.user } });

    validation.value.user = user; // Added the user to the object

    const newItem = getRepository(Item).create(validation.value);
    const result = await getRepository(Item).save(newItem);
    version++;

    return res.status(201).send(result);
});

router.put('/:id', async (req: Request, res: Response): Promise<Response> => {
    const validation = ItemSchema.validate(req.body);

    if (validation.error) {
        return res.status(400).send(validation);
    }

    let itemSelected = await getRepository(Item).findOne(parseInt(<string>req.params.id));
    if (itemSelected) {

        if (parseInt(<string>req.headers.etag) == itemSelected.version) {
            const itemUpdated = getRepository(Item).merge(itemSelected, req.body);
            const result = await getRepository(Item).save(itemUpdated);
            version++;
            return res.status(200).send(result);
        }
        return res.status(409).send('You don\'t have the last version of this Item');

    } else {
        return res.status(404).send('Item not found');
    }
})

router.patch('/:id', async (req: Request, res: Response): Promise<Response> => {
    const validation = ItemPatchSchema.validate(req.body);
    if (validation.error) {
        return res.status(400).send(validation);
    }

    let itemSelected = await getRepository(Item).findOne(parseInt(<string>req.params.id));
    if (itemSelected) {
        if (parseInt(<string>req.headers.etag) == itemSelected.version) {
            if (validation.value.description) {
                itemSelected.description = validation.value.description;
            }
            if (validation.value.status) {
                itemSelected.status = validation.value.status;
            }
            if (validation.value.dueDate) {
                itemSelected.dueDate = validation.value.dueDate;
            }
            const result = await getRepository(Item).save(itemSelected);
            version++;
            return res.status(200).send(result);
        }
        return res.status(409).send('You don\'t have the last version of this Item');
    } else {
        return res.status(404).send('Item not found');
    }
});

router.delete('/:id', async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(<string>req.params.id);
    const itemSelected = await getRepository(Item).findOne(id);
    if (!itemSelected) {
        return res.status(404).send(`There is no item with id: ${req.params.id}`)
    }

    if (parseInt(<string>req.headers.etag) == itemSelected.version) {
        const result = await getRepository(Item).delete(id);
        version++;
        return res.status(200).send();
    }
    return res.status(409).send('You don\'t have the last version of this Item');
});

// export default router;