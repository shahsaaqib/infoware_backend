const { Employee, contactDetails, sequelize } = require('../models');
import { where } from 'sequelize';
import { getPagination } from '../utils/pagination';

export async function createEmployee(data) {
  try {
    var transaction = await sequelize.transaction();

    const employee = await Employee.create(data.empDetails, {
      transaction: transaction,
    });

    data.contactDetails.map((elm) => {
      elm.empId = employee.id;
    });

    await contactDetails.bulkCreate(data.contactDetails, {
      transaction: transaction,
    });
    await transaction.commit();
    return Promise.resolve({
      status: 200,
      message: 'Employee created successfully',
    });
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    return Promise.reject(error);
  }
}

export async function listEmployee(query) {
  try {
    let data;
    if (!query.pageNumber && !query.pageLimit) {
      data = getPagination(1, 10);
    } else {
      data = getPagination(query.pageNumber, query.pageLimit);
    }
    const res = await Employee.findAndCountAll({
      offset: Number(data.offset),
      limit: Number(data.limit),
      raw: false,
      nest: true,
      include: [
        {
          model: contactDetails,
        },
      ],
      order: [['createdAt', 'DESC']],
      distinct: true,
    });
    return Promise.resolve({
      status: 200,
      count: res.count,
      data: res.rows,
    });
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}

export async function getEmployee(id) {
  try {
    const res = await Employee.findOne({
      where: {
        id,
      },
      raw: false,
      nest: true,
      include: [
        {
          model: contactDetails,
        },
      ],
    });
    return Promise.resolve({
      status: 200,
      data: res,
    });
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}

export async function updateEmployee(data) {
  try {
    var transaction = await sequelize.transaction();

    await Employee.update(data.empDetails, {
      where: {
        id: data.empDetails.id,
      },
      transaction: transaction,
    });

    for (let i = 0; i < data.contactDetails.length; i++) {
      await contactDetails.update(data.contactDetails[i], {
        where: {
          id: data.contactDetails[i].id,
        },
        transaction: transaction,
      });
    }
    await transaction.commit();
    return Promise.resolve({
      status: 200,
      message: 'Employee Updated Successfully',
    });
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    return Promise.reject(error);
  }
}

export async function deleteEmployee(id) {
  try {
    await Employee.destroy({
      where: {
        id,
      },
    });
    return Promise.resolve({
      status: 200,
      message: 'Employee Deleted Successfully',
    });
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}
