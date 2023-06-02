const fs = require("fs/promises");
const { v4 } = require("uuid");
const contactsPath = require("./db/contactsPath");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);

  return contacts;
};

const getContactById = async (id) => {
  const contactsId = String(id);
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactsId);

  return result || null;
};

const updateContacts = async (val) => {
  await fs.writeFile(contactsPath, JSON.stringify(val, null, 2));
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { name, email, phone, id: v4() };

  contacts.push(newContact);
  await updateContacts(contacts);

  return newContact;
};

const removeContact = async (id) => {
  const contactsId = String(id);
  const contacts = await listContacts();
  const deleteContact = contacts.filter((contact) => contact.id === contactsId);

  if (!deleteContact[0]) return null;

  const newContacts = contacts.filter((contact) => contact.id !== contactsId);
  await updateContacts(newContacts);

  return deleteContact[0];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
