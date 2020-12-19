// scheme-model
const db = require('../../data/db-config.js')

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
};

function find() {
    return db('schemes');
}

function findById(id) {
    return db('schemes')
    .where({id})
    .first();
}

function findSteps(id) {
    return db('schemes as s')
    // s is short for the schemes table 
    // i want to join it with n which is short for the steps table
    // i want to connect n and s through an id which n has and since i am joining what they have alike
    .join('steps as n', 'n.scheme_id', 's.id' )
    .select('n.scheme_id', 'n.step_number', 'n.instructions', 's.scheme_name')
    .where({ scheme_id: id })
}

function add(scheme) {
    return db('schemes').insert(scheme)
    .then(ids => {
        return findById(ids[0]);
    })
}

function update(changes, id) {
    return db('schemes')
    .where({ id })
    .update(changes)
    .then(count => {
        return findById(id)
    });
}

function remove(id) {
    return db('schemes')
    .where({id})
    .del();
}



