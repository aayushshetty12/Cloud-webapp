import User from "../models/user.js"

export const searchForUsername = async (username) => {
  try {
    await User.sync({ alter: true });
  
    const user = await User.findAll({
      where: {
        username,
      },
      attributes: {
        exclude: ["password"],
      },
    });
  
    return user;
  } catch (error) {
    console.error('Error occurred while fetching user:', error);
    //return null; // Or you can handle the error as needed
  }
}

export const searchToGet = async(username) => {
  try {
    const user = await User.findOne({
      where: {
        username,
      },
      attributes: {
        exclude: ["password"],
      },
    });
  
    return user;
  } catch (error) {
    console.error('Error occurred while fetching user:', error);
  }
  
}

export const searchToUpdate = async (username) => {
  try {
    const user = await User.findOne({
      where: {
        username,
      },
      attributes: {
        exclude: ["password"],
      },
    });
  
    return user;
  } catch (error) {
    console.error('Error occurred while fetching user:', error);
    //return null; // Or you can handle the error as needed
  }
} 

export const addUser = async (payload) => {

  try {
    const user = await User.create(payload, {
      attributes: ['uuid', 'first_name', 'last_Name', 'username', 'account_created', 'account_updated'], // Exclude password field
    });
    
    // Omit the password field from the returned user object
    const userResponse = user.toJSON();
    delete userResponse.password;
  
    return userResponse;
  } catch (error) {
    console.error('Error occurred while creating user:', error);
    //return null; // Or you can handle the error as needed
  }
  
}