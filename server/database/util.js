let memUsage = (message) => {
  const used = process.memoryUsage();
  for (let key in used) {
    console.log(
      message,
      `${key} ${Math.round((used[key] / 1024 / 1024) * 100) / 100} MB`
    );
  }
};

let queue = async (db, total, callback) => {
  for (let iteration = 0; iteration < 10; iteration++) {
    await callback(db, total / 10);
  }
};

module.exports.memUsage = memUsage;
module.exports.queue = queue;
