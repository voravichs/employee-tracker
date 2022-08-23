const orderedSelectAll = (db, property) => {
    return `SELECT * FROM ${db} 
    ORDER BY ${property}`;
}

const roleQuery = () => {
    return `SELECT roles.id, roles.title,roles.salary,departments.name FROM roles
    JOIN departments
    ON roles.department_id = departments.id`;
}

const employeeQuery = () => {
    return `SELECT employee.id, 
        employee.first_name, 
        employee.last_name, 
        roles.title,
        departments.name,
        roles.salary,
        manager.first_name AS manager_first_name,
        manager.last_name AS manager_last_name
    FROM employees employee
    JOIN roles
    ON employee.role_id = roles.id
    LEFT JOIN departments
    ON roles.department_id = departments.id
    LEFT JOIN employees manager
    ON employee.manager_id = manager.id`
}

module.exports = {
    orderedSelectAll,
    roleQuery,
    employeeQuery
}