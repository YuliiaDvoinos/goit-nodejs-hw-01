const { error } = require("console");
const fs = require("fs/promises");
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

// TODO: задокументировать каждую функцию

async function updateContacts(data) {
  const parsedData = JSON.stringify(data);
  try {
    await fs.writeFile(contactsPath, parsedData);
  } catch (error) {
    console.log(error);
  }
}
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    return contacts;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();

    const findContact = contacts.find((contact) => contact.id == contactId);
    if (!findContact) {
      throw error("Incorrect ID");
    }
    // console.table(findContact);
    return findContact;
  } catch (error) {
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();

    const filteredContacts = contacts.filter(
      (contact) => contact.id != contactId
    );
    await updateContacts(filteredContacts);
    const result = await listContacts();
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  const newContact = {
    id: shortid.generate(),
    name,
    email,
    phone,
  };
  try {
    const contacts = await listContacts();
    const newContacts = [...contacts, newContact];
    await updateContacts(newContacts);
    return newContact;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
