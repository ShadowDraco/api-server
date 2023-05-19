"use strict";

class Collection {
  constructor(model) {
    this.model = model;
  }

  // sequelize functions are abstracted to the collection so that code does not have to be rewritten when updated
  async create(data) {
    try {
      const newRecord = await this.model.create(data);
      return newRecord;
    } catch (error) {
      console.log("Error at collection Create-\n", error);
      return error;
    }
  }
  // read data, with id get one, else get all
  async read(id = null) {
    try {
      if (id) {
        const singleRecord = await this.model.findByPk(id);
        return singleRecord;
      } else {
        const allRecords = await this.model.findAll();
        return allRecords;
      }
    } catch (error) {
      console.log("Error at collection read-\n", error);
    }
  }

  // read data including one association. with id get one, else get all
  async readWith(id = null, model) {
    try {
      if (id) {
        const singleRecord = await this.model.findAll({
          include: [{ model: model }],
          where: { id: id },
        });
        return singleRecord;
      } else {
        const allRecords = await this.model.findAll({
          include: [{ model: model }],
        });
        return allRecords;
      }
    } catch (error) {
      console.log("Error at collection read-\n", error);
    }
  }
  // update data of one record
  async update(id, data) {
    try {
      let updatedRecord = await this.model.update(data, {
        where: { id: id },
        returning: true,
        plain: true,
      });

      return updatedRecord;
    } catch (error) {
      console.log("Error at collection update-\n", error);
    }
  }

  // delete one record and its association
  async delete(id, model = null) {
    try {
      if (model) {
        await this.model.destroy({
          include: [{ model }],
          where: { id: id },
        });
      } else {
        await this.model.destroy({
          where: { id: id },
        });
      }
      return "success";
    } catch (error) {
      console.log("Error at collection delete-\n", error);
    }
  }
}

module.exports = Collection;
