import BlackListToken from "../../models/BlackListToken.js";
import cron from "node-cron";

const deleteExpiredTokens = async () => {
  try {
    const currentTime = Math.floor(Date.now() / 1000);

    const result = await BlackListToken.deleteMany({
      $or: [
        { expire_time: { $lt: currentTime } },
        { expire_time: { $eq: null } }
      ]
    });

    console.log('Expired BlackListed Tokens deleted!', result.deletedCount);
  } catch (error) {
    console.error('Error deleting expired tokens:', error.message);
  }
};

cron.schedule("0 * * * *", deleteExpiredTokens)
deleteExpiredTokens()

export {
    deleteExpiredTokens
}
