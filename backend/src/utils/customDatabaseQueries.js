const getOrCreate = async (Model, value, key = 'name') => {
    try {
      let record = await Model.findOne({ [key]: value });
  
      if (!record) {
        record = await Model.create({ [key]: value });
      }
  
      return record;
    } catch (error) {
      throw new Error(`Error in getOrCreate: ${error.message}`);
    }
  };
  
  export { getOrCreate };
  