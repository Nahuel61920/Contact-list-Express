const { Router } = require('express');
const { addContact,
    getContacts,
    getContactId,
    updateContact,
    deleteContact
} = require('../models/index');

const routes = Router();

routes.get('/contacts', (req, res) => {
    if(req.query.name) {
        return res.json(getContacts(req.query.name));
    } else {
        return res.json(getContacts());
    }
})

routes.get('/contacts/:id', (req, res) => {
    const contact = getContactId(parseInt(req.params.id));

    if(contact) {
        return res.json(contact);
    } else {
        return res.status(404).json({ message: 'Contact not found' });
    }
})
routes.post('/contacts', (req, res) => {
    const { name, lastName, phone, email } = req.body;

    try {
        const contact = addContact(name, lastName, phone, email);
        res.status(201).json(contact);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
})
routes.put('/contacts/:id', (req, res) => {
    const { name, lastName, phone, email } = req.body;
    const contact = updateContact(parseInt(req.params.id), name, lastName, phone, email);

    if(contact) {
        return res.json(contact);
    } else {
        return res.status(404).json({ message: 'Contact not found' });
    }
})
routes.delete('/contacts/:id', (req, res) => {
    if(!deleteContact(parseInt(req.params.id))) {
        return res.status(404).json({ message: 'Contact not found' });
    } else {
        return res.status(204).json({ message: 'Contact deleted' });
    }
})

module.exports = routes;