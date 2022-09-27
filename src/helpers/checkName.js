const MAX_LENGTH = 30;
const MAX_INDEX = 26;

const checkName = (name) => {
  if (name.length > MAX_LENGTH) {
    return name.slice(0, MAX_INDEX).concat('...');
  }
  return name;
};

export default checkName;
