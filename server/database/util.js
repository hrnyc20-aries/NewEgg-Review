let memUsage = (message) => {
  const used = process.memoryUsage();
  for (let key in used) {
    console.log(
      message,
      `${key} ${Math.round((used[key] / 1024 / 1024) * 100) / 100} MB`
    );
  }
};

let queue = async (iteration, db, callback) => {
  for (let it = 0; it < iteration; it++) {
    await callback(db);
  }
};

module.exports.memUsage = memUsage;
module.exports.queue = queue;
