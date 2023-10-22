const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  return fs.readFile(contactsPath, "utf-8").then((data) => {
    return JSON.parse(data);
  });
}

function getContactById(contactId) {
  return listContacts().then((list) => {
    const filteredContact = list.find((contact) => contact.id === contactId);
    if (filteredContact) {
      const contact = {
        name: filteredContact.name,
        email: filteredContact.email,
        phone: filteredContact.phone,
        id: filteredContact.id,
      };
      console.log(contact);
    } else {
      console.log("Contact not found");
    }
  });
}

function removeContact(contactId) {
  return listContacts()
    .then((list) => {
      const filteredList = list.filter((contact) => contact.id !== contactId);
      fs.writeFile(contactsPath, JSON.stringify(filteredList), (err) => {
        if (err) console.log(err);
      });
    })
    .then(() => `Contact with ${contactId} was succesfully removed.`);
}

function addContact(name, email, phone) {
  return listContacts().then((list) => {
    const newContact = {
      id: generateUniqueId(),
      name,
      email,
      phone,
    };
    list.push(newContact);

    return fs.writeFile(contactsPath, JSON.stringify(list)).then(() => {
      console.log("Contact added succesfully");
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
function generateUniqueId() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let uniqueId = "";

  for (let i = 0; i < 21; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    uniqueId += characters.charAt(randomIndex);
  }

  return uniqueId;
}
