const notes = require("./notes");
const { nanoid } = require("nanoid");

const showNotesHandler = (request, h) => {
  const response = h.response({
    status: "success",
    data: {
      notes,
    },
    code: 200,
  });

  return response;
};

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = { id, title, tags, body, createdAt, updatedAt };

  notes.push(newNote);

  const response = h.response({
    status: "success",
    message: "Catatan berhasil ditambahkan",
    data: {
      noteId: id,
    },
    code: 201,
  });
  response.header(
    "Access-Control-Allow-Origin",
    "http://notesapp-v1.dicodingacademy.com"
  );

  return response;
};

const findNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const note = notes.find((n) => n.id === id);
  console.log(note);
  if (note) {
    return h.response({
      status: "success",
      data: {
        note,
      },
      code: 200,
    });
  } else {
    return h.response({
      status: "failed",
      message: "Catatan tidak ditemukan",
      code: 404,
    });
  }
};

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const note = notes.find((n) => n.id === id);
  if (note) {
    const { title, tags, body } = request.payload;
    const updatedAt = new Date().toISOString();
    const index = notes.indexOf(note);
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    return h.response({
      status: "success",
      message: "Catatan berhasil diperbarui",
      code: 200,
    });
  } else {
    return h.response({
      status: "failed",
      message: "Gagal memperbarui catatan. Id tidak ditemukan",
      code: 404,
    });
  }
};

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = notes.findIndex((n) => n.id === id);
  if (index !== -1) {
    notes.splice(index, 1);
    return h.response({
      status: "success",
      message: "Catatan berhasil dihapus",
      code: 200,
    });
  } else {
    return h.response({
      status: "failed",
      message: "Catatan gagal dihapus. Id tidak ditemukan",
      code: 404,
    });
  }
};

module.exports = {
  addNoteHandler,
  showNotesHandler,
  findNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
