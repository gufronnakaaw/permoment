function saveData(key, data) {
  try {
    const result = getData(key);
    result.push(data);
    localStorage.setItem(key, JSON.stringify(result));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

function getData(key) {
  return JSON.parse(localStorage.getItem(key));
}

function getDataById(key, id) {
  const result = getData(key);
  return result.find((obj) => obj.id == id);
}

function updateData(key, data, id) {
  try {
    const result = getData(key);
    const index = result.findIndex((item) => item.id === id);

    if (index !== -1) {
      result[index] = {
        ...result[index],
        ...data,
      };
      localStorage.setItem(key, JSON.stringify(result));
      return true;
    }

    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

function deleteData(key, id) {
  try {
    const result = getData(key);
    const index = result.findIndex((item) => item.id === id);

    if (index !== -1) {
      result.splice(index, 1);
      localStorage.setItem(key, JSON.stringify(result));
      return true;
    }

    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export { saveData, getData, getDataById, updateData, deleteData };
