const fs = require('fs').promises;
const path = require('path');

// Path to the simulated JSON "database"
const DB_PATH = path.join(__dirname, '..', 'database', 'contacts.json');
// Path to the index file that stores the last used contact id
const INDEX_PATH = path.join(__dirname, '..', 'database', 'contacts_index.json');

// Simple in-process write serialization to avoid read-modify-write races
let writeQueue = Promise.resolve();

function serializeWrite(fn) {
	const next = writeQueue.then(() => fn(), () => fn());
	// Ensure the queue keeps progressing even if a job rejects
	writeQueue = next.catch(() => {});
	return next;
}

async function atomicWrite(filePath, data) {
	const dir = path.dirname(filePath);
	const tmp = path.join(dir, `.tmp-${process.pid}-${Date.now()}-${Math.random().toString(36).slice(2)}`);
	await fs.writeFile(tmp, data, 'utf8');
	try {
		await fs.rename(tmp, filePath);
		return;
	} catch (err) {
		if (err && err.code === 'EXDEV') {
			await fs.copyFile(tmp, filePath);
			await fs.unlink(tmp);
			return;
		}
		if (err && (err.code === 'EEXIST' || err.code === 'EPERM' || err.code === 'ENOTEMPTY')) {
			try {
				await fs.unlink(filePath);
			} catch (unlinkErr) {
				try { await fs.unlink(tmp); } catch (e) {}
				throw err;
			}
			await fs.rename(tmp, filePath);
			return;
		}
		try { await fs.unlink(tmp); } catch (e) {}
		throw err;
	}
}

// R - read
// Branje vseh kontaktov
async function getAllContacts(req, res) {
	console.log('Fetching all contacts...');
	try {
		let file;
		try {
			file = await fs.readFile(DB_PATH, 'utf8');
		} catch (readErr) {
			console.error('Failed to read contacts database:', readErr);
			return res.status(500).json({ error: 'Failed to read contacts database' });
		}
		const contacts = JSON.parse(file || '[]');
		console.log(`Found ${contacts.length} contacts.`);
		return res.status(200).json(contacts);
	} catch (err) {
		console.error('Failed to read contacts database:', err);
		return res.status(500).json({ error: 'Failed to read contacts database' });
	}
}

// Branje enega kontakta po ID-ju
async function getContactById(req, res) {
	// Validate that an id parameter was provided
	if (req.params && req.params.id) {

		const id = req.params.id;

		console.log('URL params received');

		try {

			console.log(`Looking up contact with id: ${id}`);

			let file;
			try {
				file = await fs.readFile(DB_PATH, 'utf8');
			} catch (readErr) {
				console.error('Failed to read contacts database:', readErr);
				return res.status(500).json({ error: 'Failed to read contacts database' });
			}
			const contacts = JSON.parse(file || '[]');
			const contact = contacts.find(c => {
				return String(c.id) === id;
			});

			if (!contact) {
				console.error(`Contact with id ${id} not found`);
				return res.status(404).json({ error: `Contact with id ${id} not found` });
			}

			console.log('Contact found');

			return res.status(200).json(contact);
		} catch (err) {
			console.error('Failed to read contacts database:', err);
			return res.status(500).json({ error: 'Failed to read contacts database' });
		}
	} else {
		console.error('Missing contact id in URL params');
		return res.status(400).json({ error: 'Missing contact id in URL params' });
	}
}

// C - create
// Dodajanje novega kontakta 
async function createContact(req, res) {
	// Basic validation - require at least name, surname, phone and email
	if (req.body && req.body.name && req.body.surname && req.body.phone && req.body.email) {

		try {
			console.log('Creating new contact...');

			let file;
			try {
				file = await fs.readFile(DB_PATH, 'utf8');
			} catch (readErr) {
				// If contacts file is missing treat as empty database
				if (readErr.code === 'ENOENT') {
					file = '[]';
				} else {
					console.error('Failed to read contacts database:', readErr);
					return res.status(500).json({ error: 'Failed to read contacts database' });
				}
			}
			const contacts = JSON.parse(file || '[]');

			// Read the index file to obtain the last used id
			let idxFile;
			try {
				idxFile = await fs.readFile(INDEX_PATH, 'utf8');
			} catch (idxErr) {
				console.error('Failed to read contacts index:', idxErr);
				return res.status(500).json({ error: 'Failed to read contacts index' });
			}
			const idxObj = JSON.parse(idxFile || '{}');

			if (!idxObj) {
				console.error('Error on index file');
				return res.status(500).json({ error: 'Error on index file' });
			}

			const lastIndex = Number(idxObj.contacts_index);

			const newId = Number(lastIndex) + 1;

			const newContact = {
				id: newId,
				name: String(req.body.name),
				surname: String(req.body.surname),
				phone: String(req.body.phone),
				email: String(req.body.email),
			};

			if (req.body.company) {
				newContact.company = String(req.body.company);
			}

			contacts.push(newContact);

			// First, prepare the new index object
			const newIdxObj = { contacts_index: newId };

			// Persist index and contacts inside the write-serialization queue
			await serializeWrite(async () => {
				await atomicWrite(INDEX_PATH, JSON.stringify(newIdxObj, null, 2));
				await atomicWrite(DB_PATH, JSON.stringify(contacts, null, 2));
			});

			console.log('New contact created with id:', newId);

			return res.status(201).json(newContact);
		} catch (err) {
			console.error('Failed to create contact:', err);
			return res.status(500).json({ error: 'Failed to create contact' });
		}
	} else {
		console.error('Missing required contact fields (name, surname, phone, email)');
		return res.status(400).json({ error: 'Missing required contact fields (name, surname, phone, email)' });
	}
}

// U - update
// Posodabljanje obstojecega kontakta po ID-ju
async function updateContact(req, res) {
	// Validate that an id parameter was provided
	if (req.params && req.params.id) {

		const id = req.params.id;

		console.log('URL params received');

		// Basic validation - require at least name, surname, phone and email
		if (req.body && req.body.name && req.body.surname && req.body.phone && req.body.email) {
			try {
				console.log(`Updating contact with id: ${id}`);

				let file;
				try {
					file = await fs.readFile(DB_PATH, 'utf8');
				} catch (readErr) {
					console.error('Failed to read contacts database:', readErr);
					return res.status(500).json({ error: 'Failed to read contacts database' });
				}
				const contacts = JSON.parse(file || '[]');

				// find contact by id
				const idx = contacts.findIndex(c => String(c.id) === id);
				if (idx === -1) {
					console.error(`Contact with id ${id} not found`);
					return res.status(404).json({ error: `Contact with id ${id} not found` });
				}

				console.log('Contact found, updating...');

				const existing = contacts[idx];

				// Update allowed fields if provided
				existing.name = String(req.body.name);
				existing.surname = String(req.body.surname);
				existing.phone = String(req.body.phone);
				existing.email = String(req.body.email);
				existing.company = req.body.company ? String(req.body.company) : undefined;

				// Persist updated contacts in the write-serialization queue
				await serializeWrite(async () => {
					await atomicWrite(DB_PATH, JSON.stringify(contacts, null, 2));
				});

				console.log(`Contact with id ${id} updated successfully`);

				return res.status(200).json(existing);
			} catch (err) {
				console.error('Failed to update contact:', err);
				return res.status(500).json({ error: 'Failed to update contact' });
			}
		} else {
			console.error('Missing required contact fields (name, surname, phone, email)');
			return res.status(400).json({ error: 'Missing required contact fields (name, surname, phone, email)' });
		}
	} else {
		console.error('Missing contact id in URL params');
		return res.status(400).json({ error: 'Missing contact id in URL params' });
	}
}

// D - delete
// Brisanje obstojecga kontakta po ID-ju
async function deleteContact(req, res) {
	// Validate that an id parameter was provided
	if (req.params && req.params.id) {
		const id = req.params.id;
		console.log('URL params received');

		try {
			console.log(`Deleting contact with id: ${id}`);

			let file;
			try {
				file = await fs.readFile(DB_PATH, 'utf8');
			} catch (readErr) {
				console.error('Failed to read contacts database:', readErr);
				return res.status(500).json({ error: 'Failed to read contacts database' });
			}
			const contacts = JSON.parse(file || '[]');

			// find contact index by id
			const idx = contacts.findIndex(c => String(c.id) === id);
			if (idx === -1) {
				console.error(`Contact with id ${id} not found`);
				return res.status(404).json({ error: `Contact with id ${id} not found` });
			}

			console.log('Contact found, deleting...');

			// remove the contact
			contacts.splice(idx, 1)[0];

			// Persist updated contacts in the write-serialization queue
			await serializeWrite(async () => {
				await atomicWrite(DB_PATH, JSON.stringify(contacts, null, 2));
			});

			console.log(`Contact with id ${id} deleted successfully`);

			return res.status(204).json();
		} catch (err) {
			console.error('Failed to delete contact:', err);
			return res.status(500).json({ error: 'Failed to delete contact' });
		}
	} else {
		console.error('Missing contact id in URL params');
		return res.status(400).json({ error: 'Missing contact id in URL params' });
	}
}

module.exports = {
	getAllContacts,
	getContactById,
	createContact,
	updateContact,
	deleteContact,
};