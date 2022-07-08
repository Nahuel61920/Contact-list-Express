const contacts = [
    {
        id: 1,
        name: 'John',
        lastName: 'Doe',
        phone: 123456789,
        email: 'jonhdoe@gmail.com'
    },
    {
        id: 2,
        name: 'Jane',
        lastName: 'Doe',
        phone: 987654321,
        email: 'janedoe@gmail.com'
    },
    {
        id: 3,
        name: 'Cristian',
        lastName: 'Mendez',
        phone: 987132124,
        email: 'cristian@gmail.com'
    },
    {
        id: 4,
        name: 'Juan',
        lastName: 'Perez',
        phone: 987132124,
        email: 'juan@gmail.com'
    },
    {
        id: 5,
        name: 'Pedro',
        lastName: 'Perez',
        phone: 987132312,
        email: 'pedro@gmail.com'
    },
    {
        id: 6,
        name: 'Maria',
        lastName: 'Perez',
        phone: 987132124,
        email: 'maria@gmail.com'
    },
    {
        id: 7,
        name: 'Paolo',
        lastName: 'lucas',
        phone: 987134554,
        email: 'paolo@gmail.com'
    }
]

let prevID = 8;

function addContact(name, lastName, phone, email) {
    if (name === '' || lastName === '' || phone === '' || email === '') {
        throw new Error('All fields are required');
    } else if (typeof name !== 'string' || typeof lastName !== 'string' || typeof phone !== 'number' || typeof email !== 'string') {
        throw new Error('The arguments sent are not valid');
    } else if (contacts.find(contact => contact.name === name && contact.lastName === lastName)) {
        throw new Error('Contact already exists');
    } else {
        const contact = {
            id: prevID++,
            name,
            lastName,
            phone,
            email
        };
        contacts.push(contact);
        return contact;
    }
}

function getContacts(query) {
    if(query) {
        return JSON.parse(
            JSON.stringify(
                contacts.filter(
                    (contact) => 
                    contact.name.includes(query) || contact.lastName.includes(query) )
            )
        );
    }

    return JSON.parse(JSON.stringify(contacts));
}

function getContactId(id) {
    if (typeof id !== 'number') {
        throw new Error('The argument sent is not valid');
    } else {
        return contacts.find(contact => contact.id === id);
    }
}

function updateContact(id, name, lastName, phone, email) {
    if (typeof id !== 'number' || typeof name !== 'string' || typeof lastName !== 'string' || typeof phone !== 'number' || typeof email !== 'string') {
        throw new Error('The arguments sent are not valid');
    } else {
        const contact = contacts.find(contact => contact.id === id);
        if (contact) {
            contact.name = name;
            contact.lastName = lastName;
            contact.phone = phone;
            contact.email = email;
            return contact;
        } else {
            throw new Error('Contact not found');
        }
    }
}


function deleteContact(id) {
    if (typeof id !== 'number') {
        throw new Error('The argument sent is not valid');
    } else {
        const contact = contacts.find(contact => contact.id === id);
        if (contact) {
            contacts.splice(contacts.indexOf(contact), 1);
            return ('Contact deleted');
        } else {
            return ('Contact not found');
        }
    }
}

module.exports = {
    addContact,
    getContacts,
    getContactId,
    updateContact,
    deleteContact
}