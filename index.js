const argv = require("yargs").argv;
require("colors");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts.js");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      console.log(" => Request completed successfully!!!  =>".bgGreen);

      break;

    case "get":
      const contact = await getContactById(id);
      if (!contact) throw new Error(`ID - ${id} not found!`.bgRed);

      console.log(
        `Id: ${id} request completed successfully!!`.bgGreen,
        contact
      );

      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log(" => Contact added successfully!!!  =>".bgGreen, newContact);

      break;

    case "remove":
      const deleteContact = await removeContact(id);
      if (!deleteContact) throw new Error(`ID - ${id} not found!`.bgRed);
      
      console.log(
        `=> Contact with id: ${id} successfully deleted. =>`.bgGreen,
        deleteContact
      );

      break;

    default:
      console.warn("Unknown action!!!");
  }
};

invokeAction(argv);
