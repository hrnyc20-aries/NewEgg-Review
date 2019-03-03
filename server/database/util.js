let memUsage = (message) => {
  const used = process.memoryUsage();
  for (let key in used) {
    console.log(
      message,
      `${key} ${Math.round((used[key] / 1024 / 1024) * 100) / 100} MB`
    );
  }
};

let queue = async (iterateTo, db, callback) => {
  for (let iteration = 0; iteration < iterateTo; iteration++) {
    await callback(db);
  }
};

module.exports.memUsage = memUsage;
module.exports.queue = queue;
