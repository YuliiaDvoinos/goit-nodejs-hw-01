const fs = require("fs");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const listContactsResult = await listContacts();
      console.table(listContactsResult);
      break;

    case "get":
      const getContactByIdResult = await getContactById(id);
      console.table(getContactByIdResult);
      break;

    case "add":
      // ... name email phone
      const addContactResult = await addContact(name, email, phone);
      console.log(addContactResult);
      console.table(await listContacts());
      break;

    case "remove":
      // ... id
      const removeContactResult = await removeContact(id);
      console.table(removeContactResult);
      // console.table(await listContacts());
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
