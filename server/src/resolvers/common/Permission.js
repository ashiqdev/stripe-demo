const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { prisma } = require('../../generated/prisma-client');

const {
  MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS,
} = process.env;

function loginChecker({ request: { userId } }) {
  if (!userId) {
    throw new Error('Not authorized!');
  }
  return prisma.user({id: userId});
}

async function hasPermission(boardId, ctx) {
  const boardExists = await prisma.$exists.board({
    id: boardId,
    author: { id: ctx.request.userId },
  });
  if (!boardExists) {
    throw new Error("Target not found or you're not the author");
  }
  return true;
}

async function createHash() {
  const randomBytesPromise = promisify(randomBytes);
  // 20 is the byte we want to hash, This can be any number
  const hash = (await randomBytesPromise(20)).toString('hex');
  return hash;
}



module.exports = {
  loginChecker, hasPermission, createHash,
};
