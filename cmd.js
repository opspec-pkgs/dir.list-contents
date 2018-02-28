const fs = require('fs');
const path = require('path');
const isRecursive = JSON.parse(process.env.recursive);

/**
 * recursively walks a directory and returns its contents
 * @param {*} dirPath 
 */
function walkDir(dirPath) {
  let contentList = [];
  
  fs.readdirSync(dirPath).forEach(contentName => {
    const contentPath = path.join(dirPath, contentName);
    const contentStats = fs.statSync(contentPath);
    contentList.push({
      path: contentPath,
      modTime: contentStats.mtimeMs,
      isDir: contentStats.isDirectory(),
    });

    if (isRecursive && contentStats.isDirectory()){
      contentList.push(...walkDir(contentPath));
    }
  });

  return contentList;
}

const contentList = walkDir('.');
fs.writeFileSync('/contentList', JSON.stringify(contentList));