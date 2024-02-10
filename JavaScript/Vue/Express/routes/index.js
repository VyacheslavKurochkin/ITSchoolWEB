const express = require('express');
const router = express.Router();

let contacts = [];
let currentContactId = 1;

router.get('/api/contacts', function (req, res) {
    const term = (req.query.term || "").toUpperCase();

    const result = term.length === 0
        ? contacts
        : contacts.filter(contact => contact.name.toUpperCase().includes(term) || contact.phone.toUpperCase().includes(term));

    res.send(result);
});

router.delete("/api/contacts/:id", function (req, res) {
    const id = Number(req.params.id);

    if (!contacts.some(contact => contact.id === id)) {
        res.send({
            success: false,
            message: "Контакт не найден"
        });

        return;
    }

    contacts = contacts.filter(contact => contact.id !== id);

    res.send({
        success: true,
        message: null
    });
});

router.post("/api/contacts", function (req, res) {
    if (!req.body.name) {
        res.send({
            success: false,
            message: "Поле 'name' обязательно для заполнения"
        });

        return;
    }

    if (!req.body.phone) {
        res.send({
            success: false,
            message: "Поле 'phone' обязательно для заполнения"
        });

        return;
    }

    const updatingContactId = Number((req.query.id || 0));
    const upperCasePhone = req.body.phone.toUpperCase();

    if (contacts.some(contact => contact.phone.toUpperCase() === upperCasePhone && contact.id !== updatingContactId)) {
        res.send({
            success: false,
            message: `Контакт с телефоном '${req.body.phone}' уже добавлен`
        });

        return;
    }

    if (!updatingContactId) {
        const newContact = {
            id: currentContactId,
            name: req.body.name,
            phone: req.body.phone
        }

        contacts.push(newContact);
        currentContactId++;

        res.send({
            success: true,
            message: null
        });

        return;
    }

    const updatingContactIndex = contacts.findIndex(contact => contact.id === updatingContactId);

    contacts[updatingContactIndex].name = req.body.name;
    contacts[updatingContactIndex].phone = req.body.phone;

    res.send({
        success: true,
        message: null
    });
});

module.exports = router;