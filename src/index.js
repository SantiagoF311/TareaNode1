const contactsModule = require("./contacts");

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

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contactsModule.listContacts().then((list) => console.table(list));
      break;

    case "get":
      contactsModule.getContactById(id);
      break;

    case "add":
      contactsModule.addContact(name, email, phone).then((msg) => console.log(msg))
      break;

    case "remove":
      contactsModule.removeContact(id).then((msg) => console.log(msg));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
