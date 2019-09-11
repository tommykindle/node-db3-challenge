const db = require('./config')
module.exports = {
  find,
  findById,
  add,
  update,
  remove,
  findSteps
}


function find() {
  return db('schemes')
}

function findById(id) {
  return db('schemes')
    .where({ id }).first()
}

function add(scheme) {
  return db('schemes')
    .insert(scheme)
    .then(id => {
      return findById(id[0])
    })
}

function update(id, changes) {
  return db('schemes')
    .where({ id }).update(changes)
}

function remove(id) {
  return db('schemes')
    .where('id', id).del()
}

function findSteps(id) {
  return db('steps')
    .join('schemes', 'steps.scheme_id', '=', 'schemes.id')
    .select('steps.id', 'schemes.scheme_name', 'steps.step_number', 'steps.instructions')
    .where({ scheme_id: id })
}