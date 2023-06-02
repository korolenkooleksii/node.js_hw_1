const argv = require("yargs").argv;

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts.js");

const invokeAction = async ( {action, id, name, email, phone} ) => {
  switch (action) {

    case "list":
      const contacts = await listContacts();
      console.log("log ~ contacts🚀  => ", contacts);

      break;

    case "get":
      const contact = await getContactById(id);
      if (null) throw new Error(`ID - ${id} not found!`);
      console.log("log ~ contact🚀  => ", contact);

      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log("log ~ newContact🚀  => ", newContact);

      break;

    case "remove":
      const deleteContact = await removeContact(id);
      if (null) throw new Error(`ID - ${id} not found!`);
      console.log("log ~ removeContact🚀  => ", deleteContact);

      break;

    default:
      console.warn("Unknown action!!!");
  }
};

invokeAction(argv)
