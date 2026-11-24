const fs = require('fs').promises;
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', '..', 'data');

// Fábrica de modelos: encapsula TODA la lectura/escritura de archivos JSON.
const createModel = (fileName, idField = 'id') => {
  const filePath = path.join(DATA_DIR, fileName);

  const readAll = async () => {
    try {
      const raw = await fs.readFile(filePath, 'utf-8');
      return raw.trim() ? JSON.parse(raw) : [];
    } catch (error) {
      if (error.code === 'ENOENT') {
        await fs.mkdir(DATA_DIR, { recursive: true });
        await fs.writeFile(filePath, '[]');
        return [];
      }
      throw error;
    }
  };

  const writeAll = (items) =>
    fs.writeFile(filePath, JSON.stringify(items, null, 2), 'utf-8');

  const findAll = () => readAll();

  const findById = async (id) => {
    const items = await readAll();
    return items.find((i) => i[idField] === Number(id)) || null;
  };

  const findWhere = async (predicate) => (await readAll()).filter(predicate);

  const save = async (data) => {
    const items = await readAll();
    const nextId = items.reduce((max, i) => Math.max(max, i[idField]), 0) + 1;
    const nuevo = { [idField]: nextId, ...data };
    items.push(nuevo);
    await writeAll(items);
    return nuevo;
  };

  const update = async (id, data) => {
    const items = await readAll();
    const index = items.findIndex((i) => i[idField] === Number(id));
    if (index === -1) return null;
    items[index] = { ...items[index], ...data, [idField]: items[index][idField] };
    await writeAll(items);
    return items[index];
  };

  const remove = async (id) => {
    const items = await readAll();
    const index = items.findIndex((i) => i[idField] === Number(id));
    if (index === -1) return null;
    const [eliminado] = items.splice(index, 1);
    await writeAll(items);
    return eliminado;
  };

  return { findAll, findById, findWhere, save, update, remove };
};

module.exports = { createModel };
